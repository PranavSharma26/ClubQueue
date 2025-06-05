import express from 'express'
import { getDB } from '../../db/dbConnect.js'
import { deleteOldEvent } from '../../functions/function.js'

const router = express.Router()

router.delete('/deleteOldEvent',async (req,res)=>{
    let db = await getDB()
    try {
        deleteOldEvent(db)
        return res.status(200).json({message: "Old Events Deleted"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
})

export default router;