import express from "express";
import { getDB } from "../../db/dbConnect.js";
import { fetchLikedEvents } from "../../functions/function.js";

const router = express.Router();

router.get("/fetchLikedEvents", async (req, res) => {
  let db = await getDB();
  try {
    const { user_id } = req.query;
    // const [rows] = await db.query(
    //   `
		// 		SELECT * 
		// 		FROM liked_events
		// 		WHERE user_id = ?
    //   `,
    //   [user_id]
    // );
    const rows = await fetchLikedEvents(db,user_id)
		const likedEventsId = rows.map((row)=>row.event_id)
		return res.status(200).json({likedEvents: likedEventsId})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
