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
import editEventRoute from "./routes/event/editEvent.js"
import likeUnlikeRoute from './routes/user/likeUnlikeEvents.js'
import fetchLikedEventRoute from './routes/user/fetchLikedEvents.js'
import deleteOldEventRoute from './routes/event/deleteOldEvent.js'
import uploadClubLogoRoute from './routes/club/uploadClubLogo.js'
import deleteUserRoute from './routes/user/deleteUser.js'
import deleteClubRoute from './routes/club/deleteClub.js'
import changePasswordRoute from './routes/changePassword.js'
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
app.use("/api",authRoutes);
app.use("/api",changePasswordRoute)

// USER
app.use("/api/user",likeUnlikeRoute);
app.use("/api/user",fetchLikedEventRoute);
app.use("/api/user",deleteUserRoute);

// EVENT
app.use("/api/event", deleteEventRoute);
app.use("/api/event",postEventRoutes);
app.use("/api/event",editEventRoute);
app.use("/api/event",deleteOldEventRoute);

// CLUB
app.use("/api/club",fetchEventRoute);
app.use("/api/club",uploadClubLogoRoute);
app.use("/api/club",deleteClubRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
