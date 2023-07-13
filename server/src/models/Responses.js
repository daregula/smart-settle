import mongoose from "mongoose"

//Created a schema for mongoDB responses collection
const ResponseSchema = new mongoose.Schema({
    salary: { type: Number, required: true },
    weather: { type: String, required: true },
    infrastructure: { type: String, required: true },
    industry: { type: String, required: true },
    priorities: { type: mongoose.Schema.Types.Array, required: true },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    responseID: { type: mongoose.Schema.Types.String, ref: "users", required: true }
})
// added ref to responseID to users
export const ResponseModel = mongoose.model("responses", ResponseSchema)