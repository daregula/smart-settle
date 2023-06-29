import mongoose from "mongoose"

//Created a schema for mongoDB responses collection
const ResponseSchema = new mongoose.Schema({
    salary: { type: Number, required: true, unique: true },
    weather: { type: String, required: true },
    infrastructure: {type: String, required: true},
    industry: {type: String, required: true},
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }
})

export const ResponseModel = mongoose.model("responses", ResponseSchema)