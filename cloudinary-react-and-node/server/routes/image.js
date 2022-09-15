const express = require("express");
const {
  uploadImageUrl,
  getAllImages,
  getAllImagesDB,
} = require("../controllers/image");

const router = express.Router();

router.route("/api/upload").post(uploadImageUrl);
router.route("/api/images").get(getAllImages);
router.route("/api/db/images").get(getAllImagesDB);

module.exports = router;
