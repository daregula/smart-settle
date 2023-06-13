import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    savedResponses: [{type: mongoose.Schema.Types.ObjectId, ref: "responses"}]
})

export const UserModel = mongoose.model("users", UserSchema)