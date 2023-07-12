import mongoose from "mongoose";

//Created a schema for mongoDB responses collection
const ResultSchema = new mongoose.Schema({
    result: { type: [{}], required: true},
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    responseID: { type: mongoose.Schema.Types.String, required: true },
})

export const ResultModel = mongoose.model("results", ResultSchema)