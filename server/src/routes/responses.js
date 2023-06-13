import { ResponseModel } from "../models/Responses.js";
import  express  from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await ResponseModel.find({});
        res.json(response)
    } catch (err) {
        res.json(err); 
    }
})

router.post("/", async (req, res) => {
    const responses = new ResponseModel(req.body);
    try {
        const response = await responses.save();
        res.json(response)
    } catch (err) {
        res.json(err); 
    }
})

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

router.get("/savedResponses/ids:userOwner", async (req, res) => {
    try {
        const user = await ResponseModel.find({
            userOwner: { $in: userOwner},
        });
        // console.log(req.body.userOwner)
        res.json(user)
    } catch (err) {
        res.json(err);
    }
})

// router.get("/savedResponses", async (req, res) => {
//     try {
//         const user = await UserModel.findById(req.body.userID);
//         const savedResponses = await ResponseModel.find({
//             _id: { $in: user.savedResponses},
//         });
//         res.json({savedResponses})
//     } catch (err) {
//         res.json(err);
//     }
// })

export { router as responseRouter }


