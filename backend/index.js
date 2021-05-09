const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Port = process.env.PORT || 5000;
const dotenv = require('dotenv');
const indexRouter = require('./routes/route');
var cors = require('cors')
dotenv.config();
const auth = require('./authentication');

const dbUrl = process.env.MONGODB_URL

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

app.listen( Port, ()=>{
    console.log("listening on port 5000");
})