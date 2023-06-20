import { SMTPClient } from 'emailjs';
import  express  from "express";
import { UserModel } from "../models/Users.js"
import bcrypt from "bcrypt";


const router = express.Router();


// for contact page and user support sends emails to project email with details about the user and a message given by the user
router.post("/support", async (req, res) => {
    // creating variables that will hold the username and passwords that the user will be providing
    const { from, body, name } = req.body

    // need to set an environment variable for these credentials
    const client = new SMTPClient({
        user: 'smrtstl.sup@gmail.com',
        password: 'rwojrirarxnetccl',
        host: 'smtp.gmail.com',
        ssl: true,
    });

// send the message and get a callback with an error or details of the message that was sent
    client.send(
        {
            text: "User: " + name + "\nUser Email: "+ from + "\n" + body,
            from: 'smrtstl.sup@gmail.com',
            to: 'smrtstl.sup@gmail.com',
            cc: '',
            subject: 'User support request',
        },
        (err) => {
            console.log(err);
        }
    );
    
    const reply = 'Hello ' + name + ' thanks for reaching out we have recieved your inquiry and will be reaching out soon'
    // sends user a confirmation email about the contact request being successful
    client.send(
        {
            text: reply,
            from: 'smrtstl.sup@gmail.com',
            to: from,
            cc: '',
            subject: 'User support request',
        },
        (err) => {
            console.log(err);
        }
    );
    return res.json({ message: "email sent" })
})


// for sending secret random key to the user so they can reset their password

const randomKey = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let result = '';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
    }

    return result;
}

const temp_pwd = randomKey()



router.post("/tempPwd", async (req, res) => {
    // creating variables that will hold the username and passwords that the user will be providing
    const { email } = req.body

    // need to set an environment variable for these credentials
    const client = new SMTPClient({
        user: 'smrtstl.sup@gmail.com',
        password: 'rwojrirarxnetccl',
        host: 'smtp.gmail.com',
        ssl: true,
    });

// send the message and get a callback with an error or details of the message that was sent
    client.send(
        {
            text: temp_pwd,
            from: 'smrtstl.sup@gmail.com',
            to: email,
            cc: '',
            subject: 'This is your temporary password use it to login and change your password',
        },
        (err) => {
            console.log(err);
        }
    );

// updating the users password to match the temp password
    const hashedPassword = await bcrypt.hash(temp_pwd, 10)
    const filter = { email: email }
    const update = { $set: {password: hashedPassword} }
    
    let doc = await UserModel.findOneAndUpdate(filter, update)
    
    return res.json({ message: "password updated" })
})


export { router as emailRouter } 