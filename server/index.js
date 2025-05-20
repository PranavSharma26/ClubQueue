import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {dbConnect} from "./db/dbConnect.js";
import userSignupRoutes from "./routes/user/userSignup.js"
import userSigninRoutes from "./routes/user/userSignin.js"
dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

await dbConnect();

app.get("/", (req, res) => {
  res.send('Hi this is "/" page');
});

app.use('/api/signup',userSignupRoutes);
app.use('/api/signin',userSigninRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
