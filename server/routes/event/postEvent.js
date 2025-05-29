import express from "express";
import { getDB } from "../../db/dbConnect.js";
import { insertEvent, isEventUnique } from "../../functions/function.js";

const router = express.Router();

router.post("/postEvent", async (req, res) => {
  try {
    let db = await getDB();
    const {
      name,
      description,
      imgPath,
      eventDate,
      maxParticipants,
      location,
      registrationLink,
      club,
    } = req.body;

    if (!(await isEventUnique(name, club, db))) {
      return res.status(400).json({ error: "Event Exist" });
    }

		await insertEvent(
			name,
      description,
      imgPath,
			club,
      eventDate,
      maxParticipants,
      location,
      registrationLink,
			db
		);

		return res.status(201).json({message:"Event Added Successfully"})

  } catch (error) {
    console.log("Error Posting Event",error);
    return res.status(500).json({ error: error.data.response.data });
  }
});

export default router;
