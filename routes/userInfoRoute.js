const express = require("express");
const fileUpload = require("express-fileupload");
const { newUpload, previewUser, downloadPDF } = require("../controllers/userInfo");

const userInfoRouter = express.Router();
userInfoRouter.use(fileUpload());

userInfoRouter.post("/add", newUpload);
userInfoRouter.get("/view", previewUser)
userInfoRouter.get("/download", downloadPDF)

module.exports = { userInfoRouter };
