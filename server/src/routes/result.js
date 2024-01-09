import  express  from "express";
import fs from "fs";
import axios from "axios";
import env from "dotenv";
import  { ResultModel }  from "../models/Results.js";
import states from "us-state-converter";
// using child processes to look for the sample folder in our server dir
import child_process from 'child_process';

// 

env.config()

const router = express.Router();
// Created an API endpoint to recieve survey response data
// Data is retrieved in JSON format (e.g. data.salary)
// results/ids/:userOwner
router.post("/", async (req, res) => {
    const data = req.body;
    console.log('test');
    // 
    // testing shit out
    // so we are getting errors saying that we cannot read from the file paths for our local sample data
    // so right now we are currenly trying to figure out how to navigate to that path
    const exec = child_process.exec;
    exec('ls ./server', (error, stdout, stderr) => {
        if (error){
            console.log(error);
            return;
        }
        console.log("output from ls->\n",stdout);
        console.log(process.cwd());
    });

    res.json(process.cwd())
    // 
    // 
    // if (!data || !data.priorities || !data.salary) {
    //     return res.status(400).json({ error: 'Incomplete data provided' });
    // }

    // const sortedPrioritiesArray = Object.entries(data.priorities[0])
    // sortedPrioritiesArray.sort((a,b) => a[1] - b[1])
    
    // const costOfLivingArray = filterCostOfLiving(data.salary);
    
    // let filteredArray = costOfLivingArray;
    
    // for (let i = 0; i < sortedPrioritiesArray.length; i++) {
    //     const priority = sortedPrioritiesArray[i][0];

    //     if (priority === "weatherPriority") {
    //         filteredArray = await filterWeather(filteredArray, data.weather);
    //     } else if (priority === "infrastructurePriority") {
    //         filteredArray = await filterInfrastructure(filteredArray, data.infrastructure);
    //     } else if (priority === "industryPriority") {
    //         filteredArray = await filterIndustry(filteredArray, data.industry);
    //     }
    // }

    // filteredArray.sort((a, b) => a.cost_of_living - b.cost_of_living);
    
    // // need to loop through the final array to get all the results this is just going to return the additional information for the first result
    // // this is kinda the last filter but its not really a filter just a funcition to add some more data 
    // const finalArray = await additionalData(filteredArray)
    // if (data.userOwner){
    //     const newResult = new ResultModel({ result: finalArray, userOwner: data.userOwner, responseID: data.responseID })
    //     await newResult.save();
        
    //     res.json({ isGuest: false })
    // }
    // else{
        
    //     res.json({ isGuest: true, result: finalArray })
    // }
})

// function that will attach additional data to the final array and we will be calling multiple apis inside this function
async function additionalData(result) {
    // make api call to get the lat and long for the city and state
    const finalArray = []
    for (const entry of result){
        const { city_name, state, cost_of_living, averageTemperature, population, availableJobs, additionalData } = entry;
        const crimeCount = await getCrimeCount(state)
        const pointsOfInterest = getPointsOfInterest(state)
        const image = await getImage(state, city_name)

        const additionalDataResult = { crimeCount, pointsOfInterest, image }

        const updatedObject = {
            city_name: city_name,
            state: state,
            cost_of_living: cost_of_living,
            averageTemperature: averageTemperature,
            population: population,
            availableJobs: availableJobs,
            additionalData: additionalDataResult
        }
        finalArray.push(updatedObject)
    }

    return finalArray
}

async function getImage(state, city){
    const apiKey = process.env.REACT_APP_IMAGESAPI
    try {
        const url = `https://api.pexels.com/v1/search?query=${city}, ${state}&per_page=1`
        const response = await axios.get(url, {
            headers: {
                'Authorization': apiKey
            }
        });
        
        return response.data.photos[0].src.landscape
    } catch (error) {
        console.log("Error fetching image", error)
        return ""
    }
}


async function getCrimeCount(state_name){
    const crime_API_KEY = process.env.REACT_APP_CRIMEAPI
    const state_abbr = states.abbr(state_name)

    try {
        const response = await axios.get(`https://api.usa.gov/crime/fbi/cde/estimate/state/${state_abbr}/violent-crime?from=2015&to=2020&API_KEY=${crime_API_KEY}`)
        const crimeObj = response.data.results
        const values = Object.values(crimeObj[Object.keys(response.data.results)[0]]);
        const sum = values.reduce((acc, curr) => acc + curr, 0);

        return parseInt(sum)
    } catch (error) {
        console.log("Error fetching crime",error)
    }
}

// api to get the points of interest by city and state
function getPointsOfInterest(state) {
    try {
        const pointsOfInterest = []
        const result = fs.readFileSync("./server/src/sample_data/points_of_interest.json", "utf8", (err, res) =>{
            if (err) {
                console.log("File read failed: ", err);
                return;
            }
        });

        const resultData = JSON.parse(result)
        for (const entry of resultData){
            if (state === entry.location.state){
                pointsOfInterest.push(entry.name)
            }
        }

        return pointsOfInterest
    }
    catch(error){
        console.log("Error fetching point of interest.",error)
    }
}


function filterCostOfLiving(salaryResponse) {
    try{
        const result = fs.readFileSync("./server/src/sample_data/cost_of_living.json", "utf8", (err, res) => {
            if (err) {
                console.log("File read failed: ", err);
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
                    availableJobs: "",
                    additionalData: {}
                }
                resultArray.push(updatedObject);
            }
        }
        return resultArray;
    }
    catch(error) {
        console.log("Error fetching cost of living",error)
    }
    
}


async function filterWeather(resultArray, temperatureResponse) {
    const apiKey = process.env.REACT_APP_WEATHERAPI
    const filteredWeatherArray = []
    
    for (const entry of resultArray) {
        const { city_name, state, cost_of_living, averageTemperature, population, availableJobs, additionalData } = entry;
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
                    availableJobs: availableJobs,
                    additionalData: additionalData
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
                    availableJobs: availableJobs,
                    additionalData: additionalData
                }
                filteredWeatherArray.push(updatedObject);
            }
        } catch (err) {
            console.error("Error fetching weather",err);
        }   
    }
    return filteredWeatherArray
}

// this applies a filter to our current result of locations and narrows it down specificly to what the user declares for their response
async function filterInfrastructure(resultArray, infrastructureResponse) {
    const apiKey = process.env.REACT_APP_INFRASTRUCTUREAPI;
    const filteredInfrastructureArray = [];

    for (const entry of resultArray) {
        const { city_name, state, cost_of_living, averageTemperature, population, availableJobs, additionalData } = entry;
        try{
            // until we can figure out what to do about this api going to
            // set a static variable to cityPopulation
            // const url = `https://api.api-ninjas.com/v1/city?name=${city_name}`;
            // const response = await axios.get(url, {
            //     headers: {
            //         'X-Api-Key': apiKey
            //     }
            // });
            // const cityPopulation = response["data"][0]["population"];
            const cityPopulation = 35000;
            if (infrastructureResponse === "suburban" && cityPopulation <= 35000){
                const updatedObject = {
                    city_name: city_name,
                    state: state,
                    cost_of_living: cost_of_living,
                    averageTemperature: averageTemperature,
                    population: cityPopulation,
                    availableJobs: availableJobs,
                    additionalData: additionalData
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
                    availableJobs: availableJobs,
                    additionalData: additionalData
                }
                filteredInfrastructureArray.push(updatedObject);
            }

        } catch (err) {
            console.error("Error fetching population",err);
        }   
    }
    return filteredInfrastructureArray;
}


async function filterIndustry(resultArray, industryResponse){
    const apiKey = process.env.REACT_APP_INDUSTRYAPI;
    const userAgent = process.env.REACT_APP_EMAIL;
    const filteredIndustryArray = []
    for (const entry of resultArray){
        const { city_name, state, cost_of_living, averageTemperature, population, availableJobs, additionalData } = entry;
        
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
                availableJobs: availableJobs,
                additionalData: additionalData
            }
            filteredIndustryArray.push(updatedObject)
        }
        
    } catch (err) {
        console.error("Error fetching industry",err);
    }
    }
    return filteredIndustryArray
}


router.post("/savedResults", async (req, res) => {
    const responseID = req.body.responseID;
    try {
        const userResults = await ResultModel.find({ responseID });
        
        res.send(userResults[0].responseID)
    } catch (err) {
        res.json("Error with /savedResults endpoint",err);
    }
})


router.post("/getResults/", async (req, res) => {
    const responseID = req.body.responseID;
    try {
        const userResults = await ResultModel.find({ responseID });
        
        
        res.send(userResults[0].result)
    } catch (err) {
        res.json("Error with /getResults endpoint", err);
    }
})


export { router as resultRouter }