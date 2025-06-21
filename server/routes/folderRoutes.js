const express = require("express");
const router = express.Router();
const { getAllFolders, getFoldersByUUIDs } = require("../utils/folderCache");

router.get("/folders", (req, res) => {
  res.json(getAllFolders());
});

router.post("/match", (req, res) => {
  const uuids = req.body.uuids || [];
  res.json(getFoldersByUUIDs(uuids));
});

router.get("/search", (req, res) => {
  const uuid = req.query.uuid?.trim();
  if (!uuid) return res.json([]);

  const folders = getAllFolders();
  const match = folders.find((f) => f.folderId === uuid);
  if (match) {
    return res.json([match]);
  }
  res.json([]);
});

module.exports = router;
