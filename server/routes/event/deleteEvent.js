import express from 'express'
import { getDB } from '../../db/dbConnect.js'
import { deleteEvent } from '../../functions/function.js';

const router = express.Router()

router.delete('/deleteEvent', async (req,res)=>{
    try {
        let db = await getDB();
        const {name, club}=req.query
        if(!name || !club) return res.status(400).json({message: "Provide both eventname and clubname"})
        deleteEvent(name,club,db)
        return res.status(200).json({message: "Event Deleted"})
    } catch (err) {
        console.log("Error: ",err)
        return res.status(500).json({error: err.message || "Internal Server Error"})
    }
})

export default router;