import { SMTPClient } from 'emailjs';
import  express  from "express";

const router = express.Router();

router.post("/support", async (req, res) => {
    // creating variables that will hold the username and passwords that the user will be providing
    const { from, body, name } = req.body


    const client = new SMTPClient({
        user: 'smrtstl.sup@gmail.com',
        password: 'rwojrirarxnetccl',
        host: 'smtp.gmail.com',
        ssl: true,
    });

// send the message and get a callback with an error or details of the message that was sent
    client.send(
        {
            text: name + ": " + body,
            from: 'smrtstl.sup@gmail.com',
            to: from,
            cc: '',
            subject: 'testing emailjs',
        },
        (err) => {
            console.log(err);
        }
    );
    
    return res.json({ message: "email sent" })
})



export { router as emailRouter } 