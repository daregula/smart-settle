import mongoose from "mongoose"

//Created a schema for mongoDB responses collection
const ResponseSchema = new mongoose.Schema({
    salary: { type: String, required: true, unique: true },
    employment: { type: String, required: true },
    education: { type: String, required: true },
    weather: { type: String, required: true },
    transportation: { type: String, required: true },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }
})

export const ResponseModel = mongoose.model("responses", ResponseSchema)