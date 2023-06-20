import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID'
import '../styles/MySearches.css'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Text, Heading, Button } from '@chakra-ui/react'

export const MySearches = () => {
    const [responses, setResponses] = useState([])
    const userOwner = useGetUserID()
    const [cookies, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()

    useEffect(() => {
        
        if (!cookies.access_token){
            navigate("/login");
        }
        
        //Fetches all data from mongoDB where the userID is found
        const fetchSavedResponses = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/responses/savedResponses/ids/${userOwner}`);
                setResponses(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchSavedResponses();
    }, [userOwner]);
    
    return (
        
        <div>
            <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            <h1> My Previous Searches </h1>
            </Heading><br></br>
            <ul>
                {/* Maps through responses and displays each category on the front end */}
                {responses.map((response) => (
                    <li key={response._id}>
                        <div className="mySearches">
                            <h2>Salary: {response.salary}</h2>
                            <h2>Employment: {response.employment}</h2>
                            <h2>Education: {response.education}</h2>
                            <h2>Weather: {response.weather}</h2>
                            <h2>Transportation: {response.transportation}</h2>
                            <Button bg={'purple.400'} color={'white'} 
                            _hover={{bg: 'purple.300'}}> View Result </Button>
                            <br></br>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}