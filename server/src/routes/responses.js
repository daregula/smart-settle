import { ResponseModel } from "../models/Responses.js";
import { ResultModel } from "../models/Results.js";
import  express  from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";

// Create an Express router
const router = express.Router();

// post endpoint to update a response and associate it with a user
router.post("/", async (req, res) => {
    const newResponse = req.body
    // if the user that is attempting a new query is a logged in user then do this 
    if (newResponse.userOwner){
        try {
        const responses = new ResponseModel(newResponse);
        await responses.save()

        const user = await UserModel.findById(req.body.userOwner)
        user.savedResponses.push(req.body.responseID)
        await user.save()
        // using put we dont need the res

        res.json({ crossorigin:true, savedResponses: user.savedResponses})
        } catch (err) {
            console.log(err); 
        }
    }
    // if the user is not logged in and is a guest they should still be able to run our program do this instead
    else {
        try {
            

            res.json({crossorigin:true, savedResponses: newResponse})
        } catch (error) {
            console.log(error);
        }
        
    }
    
})

// GET endpoint to fetch saved responses for a specific user (handles showing "My previous searches" page)
router.get("/savedResponses/ids/:userOwner", async (req, res) => {
    try {
        const userOwner = req.params.userOwner;
        const userResponses = await ResponseModel.find({
            userOwner,
        });
        
        

        res.json({ crossorigin:true }, userResponses)
    } catch (err) {
        res.json(err);
    }
})

router.delete("/deleteResponse/ids/:responseID", async (req, res) => {
    try {
        const responseIDToDelete = req.params.responseID;
        await ResponseModel.deleteMany({
            responseID: responseIDToDelete,
        });
        await ResultModel.deleteMany({
            responseID: responseIDToDelete,
        });
        res.json("true")
    } catch (err) {
        res.json(err);
    }
})

// Export the router
export { router as responseRouter }


