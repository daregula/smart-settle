import React, { useEffect } from 'react'
import { useState, useCallback } from 'react'
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID'
import '../styles/MySearches.css'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Center,
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    useColorModeValue,
    SimpleGrid
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

export const MySearches = (props) => {
    const [responses, setResponses] = useState([]);
    const userOwner = useGetUserID();
    const navigate = useNavigate();

    const fetchSavedResponses = useCallback(async () => {
        try {
            const response = await axios.get(`https://smart-settle-server.vercel.app/responses/savedResponses/ids/${userOwner}`);
            setResponses(response.data);
        } catch (err) {
            console.log(err);
        }
    }, [userOwner]);

    //Fetches all data from mongoDB where the userID is found
    useEffect(() => {
        if (!props.cookie.access_token){
            navigate("/login");
        } else {
            fetchSavedResponses();
        }
        
    }, [props.cookie.access_token, navigate, userOwner, fetchSavedResponses]);

    const deleteResponse = async (RID) => {
        try {
            await axios.delete(`https://smart-settle-server.vercel.app/responses/deleteResponse/ids/${RID}`).then(() => {
                setResponses(prevResponses => prevResponses.filter(response => response.responseID !== RID))
            })
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <div style={{flexGrow: "1"}}>
            <SimpleGrid columns={3}>
                {responses.map((response) => (
                    <Pricing 
                        key={response.responseID}
                        cookie={props.cookie} 
                        salary={response.salary} 
                        weather={response.weather} 
                        infrastructure={response.infrastructure} 
                        industry={response.industry} 
                        responseID={response.responseID}
                        setResponses={setResponses}
                        userOwner={userOwner}
                        fetchSavedResponses={fetchSavedResponses}
                        onDeleteResponse={deleteResponse}
                        date={response.createdAt}
                    />
                ))}
            </SimpleGrid>
        </div>
    )
}

export default function Pricing(props) {
    
    const navigate = useNavigate()
    const fetchSavedResults = async (responseID) => {
        try {
            window.sessionStorage.setItem("responseID", responseID)
            navigate("/results");
            
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Center py={6}>
            <Box
            maxW={'330px'}
            w={'full'}
            bg={useColorModeValue('gray.50', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}>
            <Stack
                textAlign={'center'}
                p={6}
                color={useColorModeValue('gray.800', 'white')}
                align={'center'}>
                <Text
                fontSize={'sm'}
                fontWeight={500}
                bg={useColorModeValue('green.50', 'green.900')}
                p={2}
                px={3}
                color={'green.500'}
                rounded={'full'}>
                {props.date.slice(0, 10)}
                </Text>
                <Stack direction={'row'} align={'center'} justify={'center'}>
                </Stack>
            </Stack>
                <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10} >
                    <List spacing={3}>
                    <ListItem>
                        <ListIcon as={CheckIcon} color="green.400" />
                        Salary: {props.salary}
                    </ListItem>
                    <ListItem>
                        <ListIcon as={CheckIcon} color="green.400" />
                        Weather: {props.weather}
                    </ListItem>
                    <ListItem>
                        <ListIcon as={CheckIcon} color="green.400" />
                        Infrastrucutre: {props.infrastructure}
                    </ListItem>
                    <ListItem>
                        <ListIcon as={CheckIcon} color="green.400" />
                        Industry: {props.industry}
                    </ListItem>
                    </List>
                    <Button
                        mt={10}
                        w={'full'}
                        bg={'green.400'}
                        color={'white'}
                        rounded={'xl'}
                        boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                        _hover={{
                            bg: 'green.500',
                        }}
                        _focus={{
                            bg: 'green.500',
                        }}
                        onClick={() => {
                            fetchSavedResults(props.responseID)
                        }}>
                        View Result!
                    </Button>
                    <Button
                        mt={10}
                        w={'full'}
                        bg={'red.400'}
                        color={'white'}
                        rounded={'xl'}
                        boxShadow={'0 5px 20px 0px rgb(245 101 101 / 43%)'}
                        _hover={{
                            bg: 'red.500',
                        }}
                        _focus={{
                            bg: 'red.500',
                        }}
                        onClick={() => {
                            props.onDeleteResponse(props.responseID)
                        }}>
                            
                        Delete Response
                    </Button>
                </Box>
            </Box>
        </Center >
    );
}