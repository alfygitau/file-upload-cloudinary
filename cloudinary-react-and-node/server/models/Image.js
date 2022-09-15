const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    public_id: { type: String, required: true },
    imgUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", ImageSchema);
