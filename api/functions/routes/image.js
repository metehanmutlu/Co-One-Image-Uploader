import express from "express";
import {
  addImage,
  deleteImage,
  getAllImage,
  getImage,
} from "../controllers/image.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// ADD
router.post("/", upload, addImage);

// DELETE
router.delete("/:id/:ext", deleteImage);

// GET
router.get("/:id/:ext", getImage);

// GET ALL
router.get("/", getAllImage);

export default router;
