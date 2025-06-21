const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { CameraDriver } = require("ts-gphoto2-driver");

const photoOutput = path.resolve(__dirname, "../../temp/live.jpg");

router.get("/take-photo", async (req, res) => {
  try {
    const camera = await CameraDriver.open();
    const file = await camera.capture();
    const buffer = await file.readData();

    fs.writeFileSync(photoOutput, buffer);
    console.log("Saved photo to:", photoOutput);

    await camera.close();

    res.json({ success: true, filename: "live.jpg" });
  } catch (error) {
    console.error("Camera error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
