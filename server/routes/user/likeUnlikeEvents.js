import express from "express";
import { getDB } from "../../db/dbConnect.js";

const router = express.Router();

router.post("/like", async (req, res) => {
  let db = await getDB();
  try {
    const { user_id, event_id } = req.body;
    await db.query(
      `
            INSERT IGNORE INTO liked_events (user_id, event_id) VALUES (?,?)
        `,
      [user_id, event_id]
    );
    return res.status(201).json({ message: "Liked" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/unlike", async (req, res) => {
  let db = await getDB();
  try {
    const { user_id, event_id } = req.body;
    await db.query(
      `
				DELETE FROM liked_events
				WHERE user_id = ? and event_id = ?
      `,
      [user_id, event_id]
    );
    return res.status(200).json({ message: "Unliked" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;