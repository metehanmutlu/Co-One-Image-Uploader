import React from "react";
import axios from "../utils/axios";
import { BsFillTrashFill } from "react-icons/bs";
import { useImages } from "../context/ImagesProvider";
import { useState } from "react";

const ImageCard = ({ image }) => {
  const { images, setImages } = useImages();
  const [isDeleting, setIsDeleting] = useState(false);

  const imgId = image.path.split("/")[1].split(".")[0];
  const imgExt = image.path.split(".")[1];
  const imgName = image.path.split("/")[1];

  const handleDelete = async () => {
    try {
      await axios.delete(`/images/${imgId}/${imgExt}`);
      setIsDeleting(true);
      const imagesCopy = images;
      const newImages = imagesCopy.filter((img) => image.path !== img.path);
      setImages(newImages);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="imageCard">
      <button
        className="deleteBtn"
        disabled={isDeleting}
        onClick={handleDelete}
      >
        <BsFillTrashFill />
      </button>
      <div className="imageWrapper">
        <a download={imgName} href={image.url} title={imgName}>
          <img alt={imgName} src={image.url} id={imgId} />
        </a>
      </div>
    </li>
  );
};

export default ImageCard;
