const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/jwtauth");
const upload = require("../middlewares/ImgUploadMW");
const ImgUpload = require("../routers_helpers/ImgUploadHelper")


router.post("/uploadImage", AuthMiddleware, upload.single('file'), ImgUpload);

module.exports = router;