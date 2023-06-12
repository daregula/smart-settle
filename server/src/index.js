import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { userRouter } from "./routes/users.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter)

// create an environment variable for the mongodb authentication
mongoose.connect("mongodb+srv://webapp:6XPWFVBAbSAXiNpx@smart-settle.hvwbigu.mongodb.net/ssdb?retryWrites=true&w=majority")


app.listen(3001, () => console.log("Server Started"));