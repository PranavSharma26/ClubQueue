import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./db/dbConnect.js";

dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

dbConnect()
  .then(() => {
    console.log("Database Initialized");
  })
  .catch((err) => {
    console.log("Erro initializing Database", err.message);
  });

app.get("/", (req, res) => {
  res.send('Hi this is "/" page');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
