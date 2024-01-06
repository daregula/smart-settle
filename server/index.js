import  express   from "express"
import cors from "cors"
import mongoose from "mongoose"
import { userRouter } from "./src/routes/users.js"
import { responseRouter } from "./src/routes/responses.js"
import { emailRouter } from "./src/routes/email.js"
import { resultRouter } from "./src/routes/result.js"
import { editProfileRouter } from "./src/routes/edit-profile.js"
import env from "dotenv"

// Create an Express application
const app = express();

// Middleware setup
const allowedOrigins = [
    'https://smart-settle-frontend.vercel.app',
    'https://smart-settle-frontend-277le1tyv-sebastian-escobars-projects.vercel.app',
    'https://smart-settle-frontend-git-main-sebastian-escobars-projects.vercel.app'
    // Add other allowed origins as needed
];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['POST', 'GET'],
    credentials: true
    };

app.use(cors(corsOptions));

app.use(express.json());
    
// Route setup
app.use("/auth", userRouter)
app.use("/responses", responseRouter)
app.use("/smtp", emailRouter)
app.use("/result", resultRouter)
app.use("/edit-profile", editProfileRouter)

// create an environment variable for the mongodb authentication
mongoose.connect(process.env.REACT_APP_MONGOCONNECT)

app.get("/", (req, res) => {
    res.json("Server Started");
})

// Start the server and listen on port 3001
app.listen(3001, () => console.log("Server Started"));