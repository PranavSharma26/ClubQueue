import express from 'express'
import { getDB } from '../../db/dbConnect.js'
import {  } from '../../functions/function.js';

const router = express.Router()

router.get('/fetchEvent', async (req,res)=>{
    try {
        let db = await getDB();
        const {club}=req.body
        if(!club) return res.status(400).json({message: "Provide both eventname and clubname"})
        const query = `
            SELECT * 
            FROM events
            WHERE club = ?
        `;
        const data = await db.query(query,[club]);
        return res.status(200).json(data[0])

    } catch (err) {
        console.log("Error: ",err)
        return res.status(500).json({error: err.message || "Internal Servel Error"})
    }
})

export default router;