import  express  from "express";
import fs from "fs";
import axios from "axios";
import env from "dotenv";
import  { ResultModel }  from "../models/Results.js";

env.config()
const router = express.Router();

// Created an API endpoint to recieve survey response data
// Data is retrieved in JSON format (e.g. data.salary)
// results/ids/:userOwner
router.post("/", async (req, res) => {
    const data = req.body;
    // console.log(data);

    const sortedPrioritiesArray = Object.entries(data.priorities[0])
    sortedPrioritiesArray.sort((a,b) => a[1] - b[1])
    
    const costOfLivingArray = filterCostOfLiving(data.salary);
    
    let finalArray = costOfLivingArray;
    
    for (let i = 0; i < sortedPrioritiesArray.length; i++) {
        const priority = sortedPrioritiesArray[i][0];

        if (priority === "weatherPriority") {
            finalArray = await filterWeather(finalArray, data.weather);
        } else if (priority === "infrastructurePriority") {
            finalArray = await filterInfrastructure(finalArray, data.infrastructure);
        } else if (priority === "industryPriority") {
            finalArray = await filterIndustry(finalArray, data.industry);
        }
    }

    const newResult = new ResultModel({ result: finalArray, userOwner: data.userOwner, responseID: data.responseID })
    await newResult.save();

})



function filterCostOfLiving(salaryResponse) {
    const result = fs.readFileSync("../server/src/sample-data/cost_of_living.json", "utf8", (err, res) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        
    });
    const resultData = JSON.parse(result)
    
    const monthlyIncome = (salaryResponse * 0.3) / 12;
    const resultArray = []

    for (const entry of resultData) {
        const { state, city_name, cost_of_living } = entry;
        
        if(monthlyIncome > cost_of_living) {
            const updatedObject = {
                city_name: city_name,
                state: state,
                cost_of_living: cost_of_living,
                averageTemperature: "",
                population: "",
                availableJobs: ""
            }
            resultArray.push(updatedObject);
        }
    }
    return resultArray;
}


async function filterWeather(resultArray, temperatureResponse) {
    const apiKey = process.env.REACT_APP_WEATHERAPI
    const filteredWeatherArray = []
    
    for (const entry of resultArray) {
        const { city_name, state, cost_of_living, averageTemperature, population, availableJobs } = entry;
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
                    population: population,
                    availableJobs: availableJobs
                }
                filteredWeatherArray.push(updatedObject);
                }
            else if (temperatureResponse === "cool" && averageTemperature < 70){
                const updatedObject = {
                    city_name: city_name,
                    state: state,
                    cost_of_living: cost_of_living,
                    averageTemperature: averageTemperature,
                    population: population,
                    availableJobs: availableJobs
                }
                filteredWeatherArray.push(updatedObject);
            }
        } catch (err) {
            console.error(err);
        }   
    }
    return filteredWeatherArray
}

// this applies a filter to our current result of locations and narrows it down specificly to what the user declares for their response
async function filterInfrastructure(resultArray, infrastructureResponse) {
    const apiKey = process.env.REACT_APP_INFRASTRUCTUREAPI;
    const filteredInfrastructureArray = [];

    for (const entry of resultArray) {
        const { city_name, state, cost_of_living, averageTemperature, population, availableJobs } = entry;
        try{
            const url = `https://api.api-ninjas.com/v1/city?name=${city_name}`;
            const response = await axios.get(url, {
                headers: {
                    'X-Api-Key': apiKey
                }
            });
            const cityPopulation = response["data"][0]["population"];
            if (infrastructureResponse === "suburban" && cityPopulation <= 35000){
                const updatedObject = {
                    city_name: city_name,
                    state: state,
                    cost_of_living: cost_of_living,
                    averageTemperature: averageTemperature,
                    population: cityPopulation,
                    availableJobs: availableJobs
                }
                filteredInfrastructureArray.push(updatedObject);
            }
            else if (infrastructureResponse === "urban" && cityPopulation > 35000){
                const updatedObject = {
                    city_name: city_name,
                    state: state,
                    cost_of_living: cost_of_living,
                    averageTemperature: averageTemperature,
                    population: cityPopulation,
                    availableJobs: availableJobs
                }
                filteredInfrastructureArray.push(updatedObject);
            }

        } catch (err) {
            console.error(err);
            console.log(city_name);
            console.log(state);
        }   
    }
    return filteredInfrastructureArray;
}


async function filterIndustry(resultArray, industryResponse){
    const apiKey = process.env.REACT_APP_INDUSTRYAPI;
    const userAgent = process.env.REACT_APP_EMAIL;
    const filteredIndustryArray = []
    for (const entry of resultArray){
        const { city_name, state, cost_of_living, averageTemperature, population, availableJobs } = entry;
        
        try {
        const url = `https://data.usajobs.gov/api/search?Keyword=${industryResponse}&LocationName=${city_name}, ${state}`;
        const response = await axios.get(url, {
            headers: {
                'User-Agent': userAgent,
                'Authorization-Key': apiKey,
                'Host': 'data.usajobs.gov'
            }
        });
        
        const availableJobs = response['data']['SearchResult']['SearchResultCountAll']
        
        if (availableJobs >= 50){
            const updatedObject = {
                city_name: city_name,
                state: state,
                cost_of_living: cost_of_living,
                averageTemperature: averageTemperature,
                population: population,
                availableJobs: availableJobs
            }
            filteredIndustryArray.push(updatedObject)
        }
        
    } catch (err) {
        console.error(err);
    }
    }
    return filteredIndustryArray
}


router.get("/savedResults", async (req, res) => {
    const responseID = req.body.responseID;
    console.log(responseID);
    try {
        const userResults = await ResultModel.find({
            responseID,
        });
        console.log(userResults);
        res.json(userResults)
    } catch (err) {
        res.json(err);
    }
})


export { router as resultRouter }