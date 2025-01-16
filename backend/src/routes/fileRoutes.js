const express = require("express");
const uploadFile = require("../controllers/fileController");
const verifyToken = require("../middlewares/auth");
const upload = require("../middlewares/fileUpload");
const fileRouter = express.Router();

fileRouter.post("/upload", verifyToken , upload.single("file") , uploadFile);

module.exports = fileRouter;