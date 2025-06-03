import express from "express";
import { getDB } from "../../db/dbConnect.js";
import { isEventUnique, updateEvent } from "../../functions/function.js";

const router = express.Router();

router.put("/editEvent", async (req, res) => {
  try {
    let db = await getDB();
    const {
      oldName,
      name,
      description,
      imgPath,
      eventDate,
      maxParticipants,
      location,
      registrationLink,
      club,
    } = req.body;
    
    if (oldName!==name && !(await isEventUnique(name, club, db))) {
      return res.status(400).json({ error: "Event Exist" });
    }
    
    const response = await updateEvent(
      oldName,
      name,
      description,
      imgPath,
      eventDate,
      maxParticipants,
      location,
      registrationLink,
      club,
      db)
      
      if(response) return res.status(200).json({message: "Event Updated"})

      return res.status(400).json({ error: "Error updating in the table" });
    } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Error updating the event" });
  }
});

export default router;
