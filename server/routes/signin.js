import express from "express";
import dotenv from 'dotenv'
import { getDB } from "../db/dbConnect.js";
import { isCredentialExist } from "../functions/function.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config()

const router = express.Router();

router.post("/user", async (req, res) => {
  try {
    let db = await getDB();
    const { credential, password } = req.body;
    const rows = await isCredentialExist(credential, db, "users");
    if (!rows || rows.length === 0) {
      return res.status(401).json({ error: "No User Exist" });
    }
    if (await bcrypt.compare(password, rows[0].password)) {
      const { password, ...userWithoutPassword } = rows[0];

      const token = jwt.sign(
				{
        	id: userWithoutPassword.id,
        	credential: userWithoutPassword.email || userWithoutPassword.username,
          role:"user"
      	},
				process.env.JWT_SECRET,
				{expiresIn: '1h'}
			);

			res.cookie('token',token,{
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 36000000,
			})

      return res.status(200).json({message: "Logged In Successfully"});
    }
    return res.status(400).json({ error: "Incorrect Password" });
  } catch (err) {
    console.log("Error in Server", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/club", async (req, res) => {
  try {
    let db = await getDB();
    const { credential, password } = req.body;
    const rows = await isCredentialExist(credential, db, "clubs");
    if (!rows || rows.length === 0) {
      return res.status(401).json({ error: "No User Exist" });
    }
    if (await bcrypt.compare(password, rows[0].password)) {
      const { password, ...clubWithoutPassword } = rows[0];

      const token = jwt.sign(
        {
          id: clubWithoutPassword.id,
          credential: clubWithoutPassword.email || clubWithoutPassword.username,
          role:"club"
        },
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
      );

      res.cookie('token',token,{
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 36000000,
			})

      return res.status(200).json({message:"Logged In Successfully"});
    }
    return res.status(400).json({ error: "Incorrect Password" });
  } catch (err) {
    console.log("Error in Server", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;