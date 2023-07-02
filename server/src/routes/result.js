import  express  from "express";
import fs from "fs";
import axios from "axios";
const router = express.Router();

// Created an API endpoint to recieve survey response data
// Data is retrieved in JSON format (e.g. data.salary)
router.post("/", async (req, res) => {
    const data = req.body;

    const sortedPrioritiesArray = Object.entries(data.priorities[0])
    sortedPrioritiesArray.sort((a,b) => a[1] - b[1])

    const costOfLivingArray = filterCostOfLiving(data.salary);
    
    let filteredOneArray;
    let filteredTwoArray;
    let filteredThreeArray;

    // for (let i = 0; i < sortedPrioritiesArray.length; i++){
    //     if (i === 0){
    //         if (sortedPrioritiesArray[i][0] === "weatherPriority"){
    //         filteredOneArray = await filterWeather(costOfLivingArray, data.weather);
    //         }
    //         else if (sortedPrioritiesArray[i][0] === "infrastructurePriority"){
    //         filteredOneArray = await filterInfrastructure(costOfLivingArray, data.infrastructure);
    //         }
    //         else if (sortedPrioritiesArray[i][0] === "industryPriority"){
    //         filteredOneArray = await filterIndustry(costOfLivingArray, data.industry);
    //         }
    //     }
    //     else if (i === 1){
    //         if (sortedPrioritiesArray[i][0] === "weatherPriority"){
    //         filteredTwoArray = await filterWeather(filteredOneArray, data.weather);
    //         }
    //         else if (sortedPrioritiesArray[i][0] === "infrastructurePriority"){
    //         filteredTwoArray = await filterInfrastructure(filteredOneArray, data.infrastructure);
    //         }
    //         else if (sortedPrioritiesArray[i][0] === "industryPriority"){
    //         filteredTwoArray = await filterIndustry(filteredOneArray, data.industry);
    //         }
    //     }
    //     else if (i === 2){
    //         if (sortedPrioritiesArray[i][0] === "weatherPriority"){
    //             filteredThreeArray = await filterWeather(filteredTwoArray, data.weather);
    //             }
    //         else if (sortedPrioritiesArray[i][0] === "infrastructurePriority"){
    //         filteredThreeArray = await filterInfrastructure(filteredTwoArray, data.infrastructure);
    //         }
    //         else if (sortedPrioritiesArray[i][0] === "industryPriority"){
    //         filteredThreeArray = await filterIndustry(filteredTwoArray, data.industry);
    //         }
    //     }
    // }

    // console.log(filteredThreeArray)
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
    const apiKey = "b79a512b714a48f6ba315103232806"
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
    const apiKey = "L5dbnJGEdnS8+UWvD10svQ==xRs3OJjB7PMEEIPm";
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
        }   
    }
    return filteredInfrastructureArray;
}


async function filterIndustry(resultArray, industryResponse){
    const apiKey = 'uxRfZen++2Q+O5+azM0KdmriwlNbNLLOtvjy8/8H6Lg='
    const userAgent = 'tedverdecia@gmail.com'
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


export { router as resultRouter }