import express from "express";
import bcrypt from "bcrypt";
import { getDB } from "../../db/dbConnect.js";

const router = express.Router();

const isUsernameExist = async (username, db) => {
  const query = `SELECT * 
	FROM users 
	WHERE username = ?`;
  const [rows] = await db.query(query, [username]);
  if (rows.length > 0) return true;
  else return false;
};
const isEmailExist = async (email, db) => {
  const query = `SELECT * 
	FROM users 
	WHERE email = ?`;
  const [rows] = await db.query(query, [email]);
  if (rows.length > 0) return true;
  else return false;
};

const insertUser = async (
  username,
  email,
  firstName,
  lastName,
  password,
  db
) => {
  try {
    const query = `INSERT INTO users (username,email,firstName,lastName,password) VALUES(?,?,?,?,?)`;
    await db.query(query, [username, email, firstName, lastName, password]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

router.post("/user", async (req, res) => {
  try {
    let db = await getDB();
    const { username, email, firstName, lastName, password } = req.body;
    const email_lower = email.toLowerCase();
    if (await isUsernameExist(username, db))
      return res.status(400).json({ error: "Username Already Exists" });
    if (await isEmailExist(email_lower, db))
      return res.status(400).json({ error: "Email Already Exist" });

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
  } catch (error) {
    console.log("Error in Signing Up", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
