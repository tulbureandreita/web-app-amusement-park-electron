const fs = require("fs");
const path = require("path");

const PHOTOS_ROOT = path.resolve(__dirname, "../../AQUAPARK_PHOTOS");
let cachedFolders = [];
let lastLoaded = 0;

const CACHE_TTL = 30 * 1000;

const loadAllFolders = () => {
  const folderIds = fs.readdirSync(PHOTOS_ROOT).filter((name) => {
    const fullPath = path.join(PHOTOS_ROOT, name);
    return fs.statSync(fullPath).isDirectory();
  });

  const result = folderIds.map((folderId) => {
    const folderPath = path.join(PHOTOS_ROOT, folderId);
    const images = fs
      .readdirSync(folderPath)
      .filter((file) => /\.(jpg|jpeg|png)$/i.test(file))
      .map((filename, index) => ({
        id: `${folderId}-img${index + 1}`,
        filename,
      }));

    return {
      folderId,
      images,
    };
  });

  return result;
};

const getAllFolders = () => {
  const now = Date.now();
  if (now - lastLoaded > CACHE_TTL) {
    cachedFolders = loadAllFolders();
    lastLoaded = now;
  }
  return cachedFolders;
};

const getFoldersByUUIDs = (uuids) => {
  const all = getAllFolders();
  return all.filter((folder) => uuids.includes(folder.folderId));
};

module.exports = { getAllFolders, getFoldersByUUIDs };
