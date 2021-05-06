var express = require('express');
var router = express.Router();
var controller = require("../controllers/controller");

router.get('/api/public/getPictures', controller.getPictures);

router.get('/api/private/getUploadURL', controller.getUploadURL);

router.post('/api/private/uploadResult', controller.uploadPictures);

router.post('/api/private/searchPictures', controller.filterPictures);

module.exports = router;