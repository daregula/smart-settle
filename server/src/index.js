import  express   from "express"
import cors from "cors"
import mongoose from "mongoose"
import { userRouter } from "./routes/users.js"
import { responseRouter } from "./routes/responses.js"
import { emailRouter } from "./routes/email.js"
import { resultRouter } from "./routes/result.js"

// Create an Express application
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// Route setup
app.use("/auth", userRouter)
app.use("/responses", responseRouter)
app.use("/smtp", emailRouter)
app.use("/result", resultRouter)

// create an environment variable for the mongodb authentication
mongoose.connect("mongodb+srv://webapp:6XPWFVBAbSAXiNpx@smart-settle.hvwbigu.mongodb.net/ssdb?retryWrites=true&w=majority")

// Start the server and listen on port 3001
app.listen(3001, () => console.log("Server Started"));