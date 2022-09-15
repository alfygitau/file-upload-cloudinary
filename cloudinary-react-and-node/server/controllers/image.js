const { cloudinary } = require("../utils/cloudinary");
const Image = require("../models/Image");

const uploadImageUrl = async (req, res) => {
  try {
    const fileStr = req.body.data;
    console.log(fileStr);
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "bxtkk4ir",
    });
    console.log(uploadResponse);
    const image = await Image.create({
      public_id: `${uploadResponse.public_id}`,
      imgUrl: `${uploadResponse.secure_url}`,
    });
    console.log(image);
    res.json({ msg: "Image successfully uploaded to cloudinary", image });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
};

const getAllImages = async (req, res) => {
  const { resources } = await cloudinary.search
    .expression('folder:""')
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();

  console.log(resources);

  const publicIds = resources.map((file) => file.public_id);
  console.log(publicIds);
  res.send(publicIds);
};

const getAllImagesDB = async (req, res) => {
  const images = await Image.find({});
  res.json({ success: true, images });
};
module.exports = { uploadImageUrl, getAllImages, getAllImagesDB };
