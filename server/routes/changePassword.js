import express from "express"
import bcrypt from 'bcrypt'
import { getDB } from "../db/dbConnect.js"
import { changePassword } from "../functions/function.js";

const router = express.Router();

router.put("/changePassword", async (req, res) => {
  let db = await getDB();
  try {
    const { email,newPassword,role } = req.body;
		const hashedPassword = await bcrypt.hash(newPassword,10)
		const table = role==="user" ? "users" : "clubs" 
		if(await changePassword(email,hashedPassword,db,table)){
			return res.status(200).json({message:"Password Changed"})
		}
		return res.status(400).json({message:"Error changing password"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
