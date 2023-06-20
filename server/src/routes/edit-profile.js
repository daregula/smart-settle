import  express  from "express";
import  { UserModel }  from "../models/Users.js";

const router = express.Router();

// Created an API endpoint to recieve survey response data
// Data is retrieved in JSON format (e.g. data.salary)
router.post("/", async (req, res) => {
    const data = req.body;

    //We need to implement some algorithm using the response data to return some result
    console.log(data);

    const filter = { userID: data.userID };
    const update = { 
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username 
    };

    db.collection("customers").updateOne(myquery, newvalues
    
})

export { router as editProfileRouter }