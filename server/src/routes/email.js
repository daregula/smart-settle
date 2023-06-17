import { SMTPClient } from 'emailjs';
import  express  from "express";

const router = express.Router();

router.post("/support", async (req, res) => {
    // creating variables that will hold the username and passwords that the user will be providing
    const { eFrom, eBody, name } = req.body
    
    console.log(eBody, eFrom, name)

    const client = new SMTPClient({
        user: 'smrtstl.sup@gmail.com',
        password: 'rwojrirarxnetccl',
        host: 'smtp.gmail.com',
        ssl: true,
    });

// send the message and get a callback with an error or details of the message that was sent
    client.send(
        {
            text: 'eBody',
            from: eFrom,
            to: 'smrtstl.sup@gmail.com',
            cc: '',
            subject: 'testing emailjs',
        },
        (err) => {
            console.log(err);
        }
    );

})



export { router as emailRouter } 