import express from "express";
import bcrypt from "bcrypt";
import { getDB } from "../db/dbConnect.js";
import {
  insertClub,
  insertUser,
  isEmailExist,
  isUsernameExist,
} from "../functions/function.js";
const router = express.Router();

router.post("/user", async (req, res) => {
  try {
    let db = await getDB();
    const { username, email, firstName, lastName, password ,isVerified } = req.body;
    const email_lower = email.toLowerCase();
    if (await isUsernameExist(username, db, "users"))
      return res.status(400).json({ message: "Username Already Exists" });
    if (await isEmailExist(email_lower, db, "users"))
      return res.status(400).json({ message: "Email Already Exist" });

    
    if(!isVerified) return res.status(200).json({message:"Verify Email"})
      
    const hashedPassword = await bcrypt.hash(password, 10);
      
    return (await insertUser(
      username,
      email_lower,
      firstName,
      lastName,
      hashedPassword,
      db
    ))
      ? res.status(201).json({ message: "User Added Successfully" })
      : res.status(500).json({ error: "Error Inserting User" });

  } catch (err) {
    console.log("Error signing up", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/club", async (req, res) => {
  try {
    let db = await getDB();
    const { username, email, description, password ,isVerified } = req.body;
    const email_lower = email.toLowerCase();
    if (await isUsernameExist(username, db, "clubs"))
      return res.status(400).json({ message: "Clubname Already Exists" });
    if (await isEmailExist(email_lower, db, "clubs"))
      return res.status(400).json({ message: "Email Already Exist" });
    
    if(!isVerified) return res.status(200).json({message:"Verify Email"})
      
    const hashedPassword = await bcrypt.hash(password, 10);
      
    return (await insertClub(
      username,
      email_lower,
      description,
      hashedPassword,
      db
    ))
      ? res.status(201).json({ message: "Club Added Successfully" })
      : res.status(500).json({ error: "Error Inserting Club" });

  } catch (err) {
    console.log("Error signing up", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
