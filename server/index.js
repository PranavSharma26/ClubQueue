import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./db/dbConnect.js";
import signupRoutes from "./routes/signup.js";
import signinRoutes from "./routes/signin.js";
import verifyRoutes from "./utils/sendEmail.js"
import postEventRoutes from "./routes/event/postEvent.js"
import deleteEventRoute from "./routes/event/deleteEvent.js"
import fetchEventRoute from "./routes/club/fetchEvent.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";
dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

await dbConnect();

app.get("/", (req, res) => {
  res.send('Hi this is "/" page');
});

// COMMON
app.use("/api/signup", signupRoutes);
app.use("/api/verify", verifyRoutes);
app.use("/api/signin", signinRoutes);
app.use("/api",authRoutes)

// EVENT
app.use("/api/event", deleteEventRoute)
app.use("/api",postEventRoutes)

// CLUB
app.use("/api/club",fetchEventRoute)


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
