const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Port = process.env.PORT || 5000;
const dotenv = require('dotenv');
dotenv.config();

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

app.listen( Port, () => {
    console.log("Server running on port " + Port);
})