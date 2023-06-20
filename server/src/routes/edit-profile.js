import  express  from "express";
import  { UserModel }  from "../models/Users.js";
import bcrypt from "bcrypt"

const router = express.Router();

// Created an API endpoint to recieve survey response data
// Data is retrieved in JSON format (e.g. data.salary)
router.post("/", async (req, res) => {
    const data = req.body;

    //We need to implement some algorithm using the response data to return some result
    console.log(data);

    const hashedPassword = await bcrypt.hash(data.newpassword, 10)

    const filter = { _id: data.userID };
    const update = {
        $set: {
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            password: hashedPassword
        },
    };

    const user = await UserModel.findOne({_id: data.userID})
    const isPasswordValid = await bcrypt.compare(data.oldpassword, user.password)

    if(isPasswordValid) {
        
        await UserModel.updateOne(filter, update)
    }

    

})

export { router as editProfileRouter }