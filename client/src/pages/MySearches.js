import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';

export const MySearches = () => {
    const [responses, setResponses] = useState([]);
    const userOwner = useGetUserID();

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const response = await axios.get("http://localhost:3001/responses");
                setResponses(response.data)
            } catch (err) {
                console.log(err);
            }
        }

        const fetchSavedResponses = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/responses/savedResponses/ids/${userOwner}`);
                console.log(response.data)
            } catch (err) {
                console.log(err);
            }
        }

        fetchResponses();
        fetchSavedResponses();
    }, [])
    return (
        <div>
            <h1> Responses </h1>
            <br></br>
            <ul>
                {responses.map((response) => (
                    <li key={response._id}>
                        <div>
                            <h2>Salary: {response.salary}</h2>
                            <h2>Employment: {response.employment}</h2>
                            <h2>Education: {response.education}</h2>
                            <h2>Weather: {response.weather}</h2>
                            <h2>Transportation: {response.transportation}</h2>
                            <br></br>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}