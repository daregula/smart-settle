import React,{useEffect, useState} from 'react'
import { useGetUserID } from '../hooks/useGetUserID'
import axios from 'axios';
// import Image from 'react/image';
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    Image,
    SimpleGrid
} from '@chakra-ui/react';

export const Results = () => {
    const [results, setResults] = useState([]);
    const userOwner = useGetUserID();

    useEffect(() => {
        
        // if (!props.cookie.access_token){
        //     navigate("/login");
        // }
        
        //Fetches all data from mongoDB where the resultID is found
        const fetchSavedResults = async () => {
            try {
                const response = await axios.get("http://localhost:3001/result/savedResults");
                setResults(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchSavedResults();
    }, []);
    console.log(results);
    return (
        <div>
            <SimpleGrid columns={3}>
                {results.map((response) =>
                    response.result.map((resultItem) => {
                        const { city_name, state, cost_of_living, averageTemperature, population, availableJobs } = resultItem;
                        return <BlogPostWithImage city_name={city_name} state={state} cost_of_living={cost_of_living} averageTemperature={averageTemperature} population={population} availableJobs={availableJobs}/>;
                    })
                )}
            </SimpleGrid>
        </div>
    )
}

export default function BlogPostWithImage(props) {
        return (
        <Center py={6}>
            <Box
            maxW={'445px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'md'}
            p={6}
            overflow={'hidden'}>
            <Box
                h={'210px'}
                bg={'gray.100'}
                mt={-6}
                mx={-6}
                mb={6}
                pos={'relative'}>
                {/* <Image
                src={
                    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                }
                layout={'fill'}
                /> */}
            </Box>
            <Stack>
                <Text
                color={'green.500'}
                textTransform={'uppercase'}
                fontWeight={800}
                fontSize={'sm'}
                letterSpacing={1.1}>
                01-01-2023
                </Text>
                <Heading
                color={useColorModeValue('gray.700', 'white')}
                fontSize={'2xl'}
                fontFamily={'body'}>
                {props.city_name}, {props.state}
                </Heading>
                <Text color={'gray.500'}>
                Cost of Living: {props.cost_of_living}
                <br />
                Average Temperature: {props.averageTemperature}
                <br />
                Population: {props.population}
                <br />
                Number of Jobs: {props.availableJobs}
                </Text>
            </Stack>
            <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                <Avatar
                src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                alt={'Author'}
                />
                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                <Text fontWeight={600}>Achim Rolle</Text>
                <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
                </Stack>
            </Stack>
            </Box>
        </Center>
        );
}