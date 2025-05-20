import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { createTables } from "./schema.js";

dotenv.config();
let db=null
const dbConnect = async () => {
	if(db){
		return db
	}
  try {
		const connection = await mysql.createConnection({
			host:process.env.DB_HOST,
			user:process.env.DB_USER,
			password:process.env.DB_PASSWORD
		})

		await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
		console.log('Database Created Successfully or Already Exists')

		db = await mysql.createConnection({
			host:process.env.DB_HOST,
			user:process.env.DB_USER,
			password:process.env.DB_PASSWORD,
			database:process.env.DB_DATABASE
		})
		await createTables(db)
		console.log('Tables Created')
		return db
  } 
	catch (error) {
		console.log('Error Connection Database',error.message)
	}
};

const getDB = async (db) => {
	if(!db) db = await dbConnect() 
	return db
}

export { dbConnect, getDB } ;
