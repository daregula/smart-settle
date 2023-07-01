import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID'
import '../styles/MySearches.css'
import { useNavigate } from 'react-router-dom'
import {
    Heading,
    Box,
    Center,
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    useColorModeValue,
    SimpleGrid,
    Flex,
    Stat
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';




export const MySearches = (props) => {
    const [responses, setResponses] = useState([]);
    const userOwner = useGetUserID();
    const navigate = useNavigate();

    useEffect(() => {
        
        if (!props.cookie.access_token){
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
    }, [props.cookie.access_token, navigate, userOwner]);

    return (
        <div>
            <SimpleGrid columns={3}>
                {responses.map((response) => (
                    <Pricing cookie={props.cookie} salary={response.salary} weather={response.weather} infrastructure={response.infrastructure} industry={response.industry}/>
                ))}
            </SimpleGrid>
        </div>
    )
}

export default function Pricing(props) {
    return (
        <Center py={6}>
            <Box
            maxW={'330px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
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
                01-01-2023
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
                    }}>
                    View Result!
                    </Button>
                </Box>
            </Box>
        </Center >
    );
}