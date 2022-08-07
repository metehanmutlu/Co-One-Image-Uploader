import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config.js";
import { v4 as uuidv4 } from "uuid";

export const addImage = async (req, res, next) => {
  try {
    const myId = uuidv4();
    const fileExt = req.files[0].originalname.filename.split(".")[1];
    const fileName = `images/${myId}.${fileExt}`;
    const imageRef = ref(storage, fileName);

    const snapshot = await uploadBytes(imageRef, req.files[0].buffer);

    const filePath = snapshot.metadata.fullPath;
    const fileUrl = await getDownloadURL(imageRef);

    res.status(200).json({
      success: true,
      message: "File Uploaded",
      file: {
        path: filePath,
        url: fileUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteImage = async (req, res, next) => {
  try {
    const fileName = `images/${req.params.id}.${req.params.ext}`;
    const imgRef = ref(storage, fileName);

    await deleteObject(imgRef);
    res.status(200).json({
      success: true,
      message: "File Deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const getImage = async (req, res, next) => {
  try {
    const fileName = `images/${req.params.id}.${req.params.ext}`;
    const imgRef = ref(storage, fileName);

    const url = await getDownloadURL(imgRef);
    res.status(200).json({
      success: true,
      url: url,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllImage = async (req, res, next) => {
  try {
    const listRef = ref(storage, "images");
    let images = [];
    const imgList = await listAll(listRef);

    for (const imgRef of imgList.items) {
      const path = imgRef._location.path_;
      const url = await getDownloadURL(imgRef);
      images.push({ path, url });
    }
    res.json(images);
  } catch (error) {
    next(error);
  }
};
