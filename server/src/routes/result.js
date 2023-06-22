import  express  from "express";
import fs from "fs";
const router = express.Router();

// Created an API endpoint to recieve survey response data
// Data is retrieved in JSON format (e.g. data.salary)
router.post("/", async (req, res) => {
    const data = req.body;

    //We need to implement some algorithm using the response data to return some result
    console.log(data);
    fs.readFile("../server/src/sample-data/cost_of_living.json", "utf8", (err, res) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        const resultData = JSON.parse(res)
        const monthlyIncome = (parseInt(data.salary) * 0.3) / 12;
        const filteredCOL = []
        for (const entry of resultData) {
            const { state, city, cost_of_living } = entry;
            if(monthlyIncome > cost_of_living) {
                filteredCOL.push(entry);
            }
        }
        console.log(filteredCOL);
        
    });
})






export { router as resultRouter }