import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import imageRoute from "./routes/image.js";
import { error } from "./middlewares/error.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.use("/api/images", imageRoute);

app.use("/", (req, res) => {
  res.send("Hello World!");
});

app.use(error);

app.listen(process.env.PORT || 8800, () => {
  console.log("Server is up... 🚀");
});
