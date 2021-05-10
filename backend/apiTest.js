const { assert, expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

let baseURL = "https://image-repository-deploy.herokuapp.com/api";
//Image URL used for upload tests
let imageURL = "https://firebasestorage.googleapis.com/v0/b/image-repository-75e51.appspot.com/o/IMG_20201212_225351_821.jpg_1620536345577?alt=media&token=7db92f6d-fdf8-4ec2-bc6a-ed3a1ea25d01";
let testName = `test_${Date.now()}`
let accessToken = `null`;

//Options Used for Authentication
var options = { method: 'POST',
  url: 'https://dev-0ut-dv2g.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"XZEZpM8jL1dPT2iPSfqJpgWVJiHvXl5h","client_secret":"LWQDQQ-KRW_ZtFSqiYymfrrLjKK_B8yuCE24_Z_fbGoEPYDnDaj6qR4qG7gdynU1","audience":"https://image-repository/api","grant_type":"client_credentials"}' };

  chai.use(chaiHttp);
chai.should();

//Testing Public Endpoints
describe("Getting Public Image Data", ()=>{
    it("Ensuring Request Is Correct", (done)=>{
        chai.request(baseURL)
        .get("/public/getPictures")
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            assert(res.body.success === true);
            assert.typeOf(res.body.images, 'array');
            done()
        })
    }).timeout(150000);

    it("Ensuring Request Format Is Correct", (done)=>{
        chai.request(baseURL)
        .get("/public/getPictures")
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            for(let item of res.body.images){
                assert.typeOf(item.images, 'array');
                assert.typeOf(item.descriptors, 'array');
                assert.typeOf(item.name, 'string');
                assert.typeOf(item.user, 'string');
            }
            done()
        })
    }).timeout(150000);
})

//Negative Cases for Failure Endpoints
describe("Negative Case: Unauthorized Endpoints", ()=>{
    it("Negative getUploadURL", (done)=>{
        chai.request(baseURL)
        .get("/private/getUploadURL")
        .end((err, res)=>{
            res.should.have.status(401);
            done();
        })
    }).timeout(150000);

    it("Negative uploadResult", (done)=>{
        chai.request(baseURL)
        .post("/private/uploadResult")
        .end((err, res)=>{
            res.should.have.status(401);
            done();
        })
    }).timeout(150000);

    it("Negative searchPictures", (done)=>{
        chai.request(baseURL)
        .post("/private/searchPictures")
        .end((err, res)=>{
            res.should.have.status(401);
            done();
        })
    }).timeout(150000);

    it("Negative deletePictures", (done)=>{
        chai.request(baseURL)
        .post("/private/deletePictures")
        .end((err, res)=>{
            res.should.have.status(401);
            done();
        })
    }).timeout(150000);
})

describe("Test Authenticaiton", ()=>{
    it("Test Authentication", (done)=>{
        chai.request(options.url)
        .post("")
        .set('Content-Type', 'application/json')
        .send(options.body)
        .end((err, res)=>{
            assert.typeOf(res.body.access_token, 'string');
            assert(res.body.access_token !== "");
            assert(res.body.token_type === 'Bearer');
            done();
        })
    }).timeout(150000);
})

describe("Endpoints With Valid Authentication", ()=>{
    before(function(done){
        this.timeout(50000);
        chai.request(options.url)
        .post("")
        .set('Content-Type', 'application/json')
        .send(options.body)
        .end((err, res)=>{
            accessToken = res.body.access_token;
            done();
        })
    })

    it("Test Search Picture", (done)=>{
        chai.request(baseURL)
        .post("/private/searchPictures")
        .set({ "Authorization": `Bearer ${accessToken}` })
        .send({filter: ["Cat"]})
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            assert(res.body.success === true);
            assert.typeOf(res.body.images, 'array');
            for(let item of res.body.images){
                assert.typeOf(item.images, 'array');
                assert.typeOf(item.descriptors, 'array');
                assert.typeOf(item.name, 'string');
                assert.typeOf(item.user, 'string');
            }
            done();
        })
    }).timeout(150000);

    it("Test Upload Picture", (done)=>{
        chai.request(baseURL)
        .post("/private/uploadResult")
        .set({ "Authorization": `Bearer ${accessToken}` })
        .send({name: testName, image: [imageURL], user: "Test User"})
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            assert(res.body.success === true);
            done();
        })
    }).timeout(150000);

    it("Delete Picure Uploaded", (done)=>{
        chai.request(baseURL)
        .post("/private/deletePictures")
        .set({ "Authorization": `Bearer ${accessToken}` })
        .send({name: testName})
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            assert(res.body.success === true);
            done();
        })
    }).timeout(150000);

    it("Get Upload URL", (done)=>{
        chai.request(baseURL)
        .get("/private/getUploadURL")
        .set({ "Authorization": `Bearer ${accessToken}` })
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    }).timeout(150000);
})