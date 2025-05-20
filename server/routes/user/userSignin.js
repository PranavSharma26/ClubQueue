import express from "express";
import bcrypt from "bcrypt";
import { getDB } from "../../db/dbConnect.js";
const router = express.Router();

// const ifEmailExist = async (credential,db) => {
//     const query=`SELECT *
//         FROM users
//         WHERE email = ? `
//     const [rows] = await db.query(query,[credential])
//     if(rows.length>0) return true
//     return false
// }

// const ifUsernameExist = async (credential,db) => {
//     const query=`SELECT *
//         FROM users
//         WHERE username = ? `
//     const [rows] = await db.query(query,[credential])
//     if(rows)
// }

const isCredentialExist = async (credential, db) => {
  const query = `SELECT * 
        FROM users 
        WHERE email = ? or username = ?`;
  const [rows] = await db.query(query, [credential, credential]);
  if (rows.length > 0) return rows;
};
router.post("/user", async (req, res) => {
  try {
    let db = await getDB();
    const { credential, password } = req.body;
		const rows = await isCredentialExist(credential,db)
		if(!rows){
			return res.status(400).json({error:"Username or Email Not Found"})
		}
		if(await bcrypt.compare(password,rows[0].password)){
      const {password, ...userWithoutPassword} = rows[0]
			return res.status(200).json({user: userWithoutPassword})
		}
		else{
			return res.status(402).json({error:"Incorrect Password"})
		}

  } catch (error) {
    return res.status(500).json({ error: "Error Sigining In" });
  }
});

export default router;
