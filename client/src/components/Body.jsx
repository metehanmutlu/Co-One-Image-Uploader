import React, { useState } from "react";
import { useImages } from "../context/ImagesProvider";
import ImageCard from "./ImageCard";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "../utils/axios";
import { Bounce } from "react-activity";
import "react-activity/dist/Bounce.css";

const Body = () => {
  const { images, setImages } = useImages();
  const [image, setImage] = useState(null);
  const [isProgress, setIsProgress] = useState(false);

  const handleUpload = async () => {
    try {
      if (image) {
        const data = new FormData();
        data.append("img", image);
        setIsProgress(true);
        const response = await axios.post("/images", data);
        setIsProgress(false);
        setImages((prev) => [...prev, response.data.file]);
        setImage(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="imgUpload">
        <label
          htmlFor="myFile"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AiOutlineCloudUpload className="uploadIcon" />
          <span style={{ fontSize: "26px", marginBottom: "15px" }}>
            {image ? image.name : "Select your image"}
          </span>
        </label>
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          id="myFile"
          name="myFile"
        />
        <button
          className={image ? "uploadBtn" : "disabledUploadBtn"}
          onClick={handleUpload}
          disabled={!image}
        >
          Upload Image
        </button>
        <br />
        {isProgress && <Bounce color="white" size={20} />}
      </div>
      <ul className="imagesWrapper">
        {images.map((image) => (
          <ImageCard
            image={image}
            key={image.path.split("/")[1].split(".")[0]}
          />
        ))}
      </ul>
    </>
  );
};

export default Body;
