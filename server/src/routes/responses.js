import { ResponseModel } from "../models/Responses.js";
import  express  from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";

// Create an Express router
const router = express.Router();

// GET endpoint to fetch all responses
router.get("/", async (req, res) => {
    try {
        const response = await ResponseModel.find({});
        res.json(response)
    } catch (err) {
        res.json(err); 
    }
})

// POST endpoint to create a new response
router.post("/", async (req, res) => {
    const responses = new ResponseModel(req.body);
    try {
        const response = await responses.save();
        res.json(response)
    } catch (err) {
        res.json(err); 
    }
})

// PUT endpoint to update a response and associate it with a user
router.put("/", async (req, res) => {
    try {
        const responses = await ResponseModel.findById(req.body.responseID)
        const user = await UserModel.findById(req.body.userID)
        user.savedResponses.push(responses)
        await user.save()
        res.json({savedResponses: user.savedResponses})
    } catch (err) {
        res.json(err); 
    }
})

// GET endpoint to fetch saved responses for a specific user (handles showing "My previous searches" page)
router.get("/savedResponses/ids/:userOwner", async (req, res) => {
    try {
        const userOwner = req.params.userOwner;
        const userResponses = await ResponseModel.find({
            userOwner,
        });
        res.json(userResponses)
    } catch (err) {
        res.json(err);
    }
})

// Export the router
export { router as responseRouter }


