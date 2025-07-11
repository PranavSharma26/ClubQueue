import express from "express";
import { getDB } from "../../db/dbConnect.js";
import { fetchEvents, insertEvent, isEventUnique } from "../../functions/function.js";

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

		if(await insertEvent(
			name,
      description,
      imgPath,
      eventDate,
      maxParticipants,
      location,
      registrationLink,
			club,
			db
		)){
      return res.status(201).json({message:"Event Added Successfully"})
    }
    return res.status(400).json({message:"Error inserting the event"})

  } catch (error) {
    console.log("Error Posting Event",error);
    return res.status(500).json({ error: error.message || "Internal Server Error"});
  }
});

router.get("/postEvent", async (req, res) => {
  try {
    let db = await getDB();
    // const query=`
    //   SELECT *
    //   FROM events
    //   ORDER BY id desc
    // `
    // let data = await db.query(query)
    let data = await fetchEvents(db)
    return res.status(200).json(data);

  } catch (error) {
    console.log("Error Posting Event",error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});
export default router;