import  express  from "express";
import fs from "fs";
import axios from "axios";
const router = express.Router();

// Created an API endpoint to recieve survey response data
// Data is retrieved in JSON format (e.g. data.salary)
router.post("/", async (req, res) => {
    const data = req.body;
    const COLArray = filterCostOfLiving(data.salary)
    console.log(COLArray)
    // filterWeather([COLArray], data.temperature)
    
})

//Take out filter Weather logic from post request and make into its own function
async function filterCostOfLiving(salaryResponse) {
    
    const result = fs.readFileSync("../server/src/sample-data/cost_of_living.json", "utf8", (err, res) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        // const resultData = JSON.parse(res)
        const monthlyIncome = (parseInt(salaryResponse) * 0.3) / 12;
        const resultArray = []
        for (const entry of resultData) {
            const { state, city, cost_of_living } = entry;
            if(monthlyIncome > cost_of_living) {
                resultArray.push(entry);
            }
        }
    });
    return JSON.parse(result);
}

async function filterWeather(resultArray, temperatureResponse) {
    const apiKey = "b79a512b714a48f6ba315103232806"
    const filteredWeatherArray = []
    for (const entry of resultArray) {
        const { city_name, state, cost_of_living } = entry;
        try{
            const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city_name}&aqi=no`
            const response = await axios.get(url);
            const averageTemperature = response["data"]["current"]["temp_f"];
            if(temperatureResponse === "warm" && averageTemperature >= 70) {
                const updatedObject = {
                    city_name: city_name,
                    state: state,
                    cost_of_living: cost_of_living,
                    averageTemperature: averageTemperature,
                }
                filteredWeatherArray.push(updatedObject);
                } 
            
            else if (temperatureResponse === "cool" && averageTemperature < 70){
                const updatedObject = {
                    city_name: city_name,
                    state: state,
                    cost_of_living: cost_of_living,
                    averageTemperature: averageTemperature,
                }
                filteredWeatherArray.push(updatedObject);
            }
        } catch (err) {
            console.error(err);
        }   
    }
    console.log(filteredWeatherArray);
}

async function filterInfrastructure(resultArray, infrastructureResponse) {
    const apiKey = "L5dbnJGEdnS8+UWvD10svQ==xRs3OJjB7PMEEIPm";
    const filteredInfrastructureArray = []
    for (const entry of resultArray) {
        const { city_name, state, cost_of_living } = entry;
        try{
            const url = `https://api.api-ninjas.com/v1/city?name=${city_name}`;
            const response = await axios.get(url, {
                headers: {
                    'X-Api-Key': apiKey
                }
            });
            cityPopulation = response["data"][0]["population"];
        } catch (err) {
            console.error(err);
        }   
    }
}



//We need to keep one array that holds all changes to pass to all the other functions
//We need to pass in a priority number as a parameter to each function



export { router as resultRouter }