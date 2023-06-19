import  express  from "express";

const router = express.Router();

// Created an API endpoint to recieve survey response data
// Data is retrieved in JSON format (e.g. data.salary)
router.post("/", async (req, res) => {
    const data = req.body;

    //We need to implement some algorithm using the response data to return some result
    console.log(data);
    
})

export { router as resultRouter }