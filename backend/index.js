const express = require('express');
const mongoose = require('mongoose');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const app = express();
const Port = process.env.PORT || 5000;
const dotenv = require('dotenv');
const indexRouter = require('./routes/route');
var cors = require('cors')
dotenv.config();

const dbUrl = process.env.MONGODB_URL

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-0ut-dv2g.us.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://image-repository/api',
  issuer: [`https://dev-0ut-dv2g.us.auth0.com/`],
  algorithms: ['RS256']
});

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('MongoDB is connected')
    } catch (error) {
        console.log(error)
    }
}

connectDB();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use('/', indexRouter);

app.listen( Port, () => {
    console.log("Server running on port " + Port);
})