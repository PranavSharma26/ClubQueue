import express from 'express'
import {getDB} from '../../db/dbConnect.js'
import { deleteUser } from '../../functions/function.js'

const router = express.Router()

router.delete('/deleteUser',async (req,res)=>{
    let db = await getDB()
    try {
        const {id} = req.query
        await deleteUser(db,id)
        return res.status(200).json({message:"User Deleted"})        
    } catch (error) {
        return res.status(500).json({error:"Internal Server Error"})
    }
})

export default router