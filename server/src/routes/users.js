import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { UserModel } from "../models/Users.js"

const router = express.Router()

// creating the two route endpoints for registering a user
router.post("/register", async (req, res) => {
    const { username, password, firstname, lastname, email } = req.body
    // creating a request to our mongodb collections
    const user = await UserModel.findOne({ username })

    if (user) {
        return res.json({ message: "User already exists" })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({ username, password: hashedPassword, firstname, lastname, email })
    await newUser.save()

    res.json({ message:"User registered successfully" })
})


// creating the route for user login
router.post("/login", async (req, res) => {
    // creating variables that will hold the username and passwords that the user will be providing
    const { username, password } = req.body

    // fetching the user entry from the database
    const user = await UserModel.findOne({ username })

    // if user returns a null value we return this error message
    if (!user) {
        return res.json({ message: "User does not exist "})
    }

    // bycrypt built in function that we use to compare the password provided by the user with the password that we have in the database for that username
    const isPasswordValid = await bcrypt.compare(password, user.password)

    // if password is incorrect we will be returned a false value and in turn return an error message
    if (!isPasswordValid) {
        return res.json({ message: "Username or Password is Incorrect" })
    }
    // create an environment variable for the string secret
    const token = jwt.sign({ id: user._id }, "secret")
    res.json({ token, userID: user._id })

})

export { router as userRouter }