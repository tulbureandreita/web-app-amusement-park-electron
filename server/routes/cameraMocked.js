const express = require("express");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const axios = require("axios");
const router = express.Router();

router.get("/take-photo", async (req, res) => {
  try {
    const testImagePath = path.join(__dirname, "../mock/test-image.jpg");

    const form = new FormData();
    form.append("file", fs.createReadStream(testImagePath), {
      filename: "test.jpg",
      contentType: "image/jpeg",
    });

    const response = await axios.post(
      "http://localhost:8000/upload_image/",
      form,
      {
        headers: form.getHeaders(),
        timeout: 30000,
      }
    );

    console.log("Python API response:", response.data);

    res.json({ message: "Mock image sent to Python API", data: response.data });
  } catch (err) {
    console.error("Mock image upload failed:", err.message);
    res.status(500).json({ error: "Mock upload failed", details: err.message });
  }
});

module.exports = router;
