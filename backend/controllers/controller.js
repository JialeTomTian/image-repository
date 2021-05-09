const dotenv = require("dotenv");
const imageModel = require("../models/imageSchema");
const mongoose = require("mongoose");
const vision = require("@google-cloud/vision");
const { animals } = require("../models/animal");
dotenv.config();

exports.getPictures = async (req, res) => {
  try {
    let results = await imageModel.find();
    console.log(results);
    res.json({
      success: true,
      images: results
    })
  } catch(error) {
    console.log(error.message);
    res.json({
      success: false,
      error: error.message
    })
  }
};

exports.filterPictures = async(req, res) => {
  try{
    console.log(req.body.filter);
    let results = await imageModel.find({descriptors: {$all : req.body.filter}});
    res.json({
      success: true,
      images: results
    })
  } catch(error) {
    console.log(error.message);
    res.json({
      success: false,
      error: error.message
    })
  }
}

exports.uploadPictures = async (req, res) => {
  try {
    let descriptors = [];
    const client = new vision.ImageAnnotatorClient({
      keyFileName: `${process.env.GOOGLE_APPLICATION_CREDENTIALS}`,
    });
    console.log(req.body);
    console.log(animals);
    for(let url of req.body.image){
      console.log(url)
      const [result] = await client.labelDetection(url);
      console.log(result);
      for(let item of result.labelAnnotations){
        if (animals.includes(item.description) && !descriptors.includes(item.description)){
          descriptors.push(item.description);
        }
      }
    }
    let obj = {
      name: req.body.name,
      user: req.body.user,
      descriptors: descriptors,
      images: req.body.image,
    };
    imageModel.create(obj, (err, item) => {
      res.json({ success: true });
    });
  } catch (err) {
    console.log(err);
    res.json({ sucess: false, error: err });
  }
};

exports.getUploadURL = (req, res) => {
  let result = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messageSenderId: process.env.messageSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
  };
  try {
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};
