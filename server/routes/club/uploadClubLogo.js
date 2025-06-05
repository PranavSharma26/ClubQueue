import express from "express";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { upload } from "../../middlewares/multer.middleware.js";
import {getDB} from '../../db/dbConnect.js'
const router = express.Router();
import fs from "fs/promises"

router.post("/uploadClubLogo", upload.single("logo"), async (req, res) => {
	try {
		const db = await getDB()
	const club=req.body.username
  const localPath = req.file?.path;
  if (!localPath) return res.status(400).json({ error: "No file uploaded" });

  const url = await uploadOnCloudinary(localPath);

  if (!url) return res.status(500).json({ error: "Upload failed" });

		await db.query('UPDATE clubs SET logo = ? WHERE username = ?', [url, club])
		await fs.unlink(localPath);
    return res.status(200).json({ message: "Image Uploaded successfully" });
  } catch (error) {
    return res.status(500).json({ error: error?.message || "Internal Server message" });
  }
});

export default router;
