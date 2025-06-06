import express from 'express'
import {getDB} from '../../db/dbConnect.js'
import { deleteClub } from '../../functions/function.js'

const router = express.Router()

router.delete('/deleteClub',async (req,res)=>{
    let db = await getDB()
    try {
        const {id} = req.query
        await deleteClub(db,id)
        return res.status(200).json({message:"Club Deleted"})        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal Server Error"})
    }
})

export default router