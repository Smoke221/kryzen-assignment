const express = require("express");
const axios = require("axios");
const AWS = require("aws-sdk");
const PDFDocument = require("pdfkit");
const { userModel } = require("../models/userModel");
const { formModel } = require("../models/formModel");

const s3 = new AWS.S3();

async function newUpload(req, res) {
  try {
    const { name, age, address } = req.body;

    const photo = req.files.photo;

    // Upload the file to S3
    const params = {
      Bucket: "kryzen",
      Key: photo.name,
      Body: photo.data,
      ContentType: "image/jpeg",
    };

    const s3UploadResponse = await s3.upload(params).promise();
    // Ensure that s3UploadResponse.Location is defined
    if (!s3UploadResponse.Location) {
      return res
        .status(500)
        .json({ message: "Internal Server Error. S3 Location is undefined." });
    }

    const newUserDetails = new formModel({
      name,
      age,
      address,
      photoURL: s3UploadResponse.Location,
    });
    await newUserDetails.save();

    res.status(201).json({ message: "New user details uploaded" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

async function previewUser(req, res) {
  try {
    const latestUser = await formModel.findOne().sort({ _id: -1 });

    res
      .status(200)
      .json({ message: "Latest user details", details: latestUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

async function downloadPDF(req, res) {
    try {
      const topUser = await formModel.findOne().sort({ _id: -1 });
      const userDetails = {
        name: topUser.name,
        age: topUser.age,
        address: topUser.address,
        photoURL: topUser.photoURL,
      };
  
      const doc = new PDFDocument();
  
      // Set content disposition to force download
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${userDetails.name}.pdf`
      );
  
      // Pipe the PDF content to the response
      doc.pipe(res);
  
      // Header
      doc.fontSize(20).text('User Details', { align: 'center' });
  
      // Add content to the PDF
      doc.moveDown(); // Add some space
      doc.fontSize(16).text(`Name: ${userDetails.name}`);
      doc.fontSize(16).text(`Age: ${userDetails.age}`);
      doc.fontSize(16).text(`Address: ${userDetails.address}`);
  
      // Stylized Image Border
      if (userDetails.photoURL) {
        const imageResponse = await axios.get(userDetails.photoURL, {
          responseType: 'arraybuffer',
        });
  
        const imageBuffer = Buffer.from(imageResponse.data);
  
        // Calculate the position for the image
        const imageX = 100;
        const imageY = doc.y + 10;
  
        // Draw a border around the image
        doc.rect(imageX - 5, imageY - 5, 210, 210).stroke('#3498db');
        
        // Embed the image in the PDF
        doc.image(imageBuffer, imageX, imageY, { width: 200, height: 200 });
      }
  
      // End the document
      doc.end();
    } catch (err) {
      res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  }

module.exports = { newUpload, previewUser, downloadPDF };
