import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Gallery() {
  const [images, setImages] = useState();

  const loadImages = async () => {
    const res = await axios.get("/api/db/images");
    setImages(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div>
      <h1 className="title">Cloudinary Gallery</h1>
      <div className="gallery">
        {images &&
          images.map((image, index) => (
            <div key={index}>
              <img src={image.imgUrl} alt={image.imgUrl} width="300" />
              {/* <a
                href={image.imgUrl}
                download={image.imgUrl}
                style={{ color: "green" }}
              >
                Download
              </a> */}
              <button>Download</button>
            </div>
          ))}
      </div>
    </div>
  );
}
