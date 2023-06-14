import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
import '../styles/MySearches.css'

export const MySearches = () => {
    const [responses, setResponses] = useState([]);
    const userOwner = useGetUserID();
    

    useEffect(() => {
        // const fetchResponses = async () => {
        // try {
        //     const response = await axios.get("http://localhost:3001/responses");
        //     setResponses(response.data);
        // } catch (err) {
        //     console.log(err);
        // }
        // };

        const fetchSavedResponses = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/responses/savedResponses/ids/${userOwner}`);
                setResponses(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        // fetchResponses();
        fetchSavedResponses();
    }, [userOwner]);
    return (
        <div>
            <h1> My Previous Searches </h1>
            <br></br>
            <ul>
                {responses.map((response) => (
                    <li key={response._id}>
                        <div className="mySearches">
                            <h2>Salary: {response.salary}</h2>
                            <h2>Employment: {response.employment}</h2>
                            <h2>Education: {response.education}</h2>
                            <h2>Weather: {response.weather}</h2>
                            <h2>Transportation: {response.transportation}</h2>
                            <button style={{background: "lightgrey", width: "150px"}}> View Result </button>
                            <br></br>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}