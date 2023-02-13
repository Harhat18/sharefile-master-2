import express, { response } from "express";
import multer from "multer";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import File from "../models/File";
const router = express.Router();

const storage = multer.diskStorage({});

let upload = multer({
  storage,
});

router.post("/upload", upload.single("myFile"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: " hey bro! we need the file" });
    console.log(req.file);
    let uploadedFile: UploadApiResponse;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "sharemeYT",
        resource_type: "auto",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: " cloudinary error" });
    }
    const { originalname } = req.file;
    const { secure_url, bytes, format } = uploadedFile;
    const file = await File.create({
      filename: originalname,
      sizeInBytes: bytes,
      secure_url,
      format,
    });
    res.status(200).json({
      id: file._id,
      downloadPageLink: `${process.env.API_BASE_ENDPOINT_CLIENT}download/${file.id}`,
    });
  } catch (error) {
    console.log(Error);
    res.status(500).json({ message: " server error " });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const file = await File.findById(id);
    if (!file) {
      return res.status(400).json({ message: "File dose not exist" });
    }

    const { filename, format, sizeInBytes } = file;
    return res.status(200).json({
      name: filename,
      sizeInBytes,
      format,
      id,
    });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
});
export default router;
