import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getDB } from "../db/dbConnect.js";
import { fetchClubData, fetchUserData } from "../functions/function.js";
dotenv.config();
const router = express.Router();

router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Not Authenticated" });
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const db = await getDB();
    let data;
    if (payload.role === "user") {
      const user = await fetchUserData(payload.id, db);
      if (!user)
        return res.status(404).json({ error: "User Not Found" });
      data = user;
    } else if (payload.role === "club") {
      const club = await fetchClubData(payload.id, db);
      if (!club)
        return res.status(404).json({ error: "Club Not Found" });
      data = club;
    } else {
      return res.status(400).json({ message: "Unknown Role" });
    }

    return res.status(200).json({ role: payload.role, data });
  } catch (err) {
    console.log("Error logging in", err)
    return res.status(401).json({ error: "Invalid Token" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({ message: "Logged Out Successfully" });
});

export default router;
