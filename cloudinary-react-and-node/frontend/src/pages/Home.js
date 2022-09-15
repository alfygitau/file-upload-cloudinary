import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import Axios from "axios";
import FileDownload from "js-file-download";

export default function Home() {
  const [imageIds, setImageIds] = useState();
  const loadImages = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      console.log(data);
      setImageIds(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    loadImages();
  }, []);

  const downloadImage = (e) => {
    e.preventDefault();
    Axios({
      url: "http://localhost:5001",
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      console.log(response);
      FileDownload(response.data, "downloaded");
    });
  };
  return (
    <div>
      <h1 className="title">Cloudinary Gallery</h1>
      <div className="gallery">
        {imageIds &&
          imageIds.map((imageId, index) => (
            <>
              <Image
                key={index}
                cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                publicId={imageId}
                width="300"
                crop="scale"
              />
            </>
          ))}
      </div>
    </div>
  );
}
