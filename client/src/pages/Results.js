import React, {useEffect, useState, useMemo} from 'react'
import axios from 'axios';
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    useColorModeValue,
    Image,
    SimpleGrid,
    Button
} from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

export const Results = () => {
    const [results, setResults] = useState([]);
    const responseID = useMemo(() => ({ responseID: window.localStorage.getItem("responseID") }), []);

    useEffect(() => {
    const fetchSavedResults = async () => {
        try {
            const response = await axios.post("http://localhost:3001/result/getResults", responseID)
            setResults(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    fetchSavedResults();
}, [responseID]);

    console.log(results.length);
    if(results.length > 0){
        return (
            <div style={{ flexGrow: "1"}}>
                
                <SimpleGrid columns={3}>
                    
                    {results.map((resultItem, index) => {
                        const { city_name, state, cost_of_living, averageTemperature, population, availableJobs } = resultItem;
                        return (
                            <BlogPostWithImage
                                key={`${resultItem.city_name}-${index}`} // Add a unique key prop
                                city_name={city_name}
                                state={state}
                                cost_of_living={cost_of_living}
                                averageTemperature={averageTemperature}
                                population={population}
                                availableJobs={availableJobs}
                            />
                        );
                    })
                    }
                </SimpleGrid>
            </div>
        )
    }
    else {
        return <Warning />
    }
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
                <Image
                h = '230px'
                w = '500px'
                src={
                    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                }
                layout={'fill'}
                />
            </Box>
            <Stack>
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
            </Box>
        </Center>
        );
}

function Warning() {
    const navigate = useNavigate()
    return (
    <Box textAlign="center" py={10} px={6}>
        <WarningTwoIcon boxSize={'50px'} color={'purple.300'} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
        No results
        </Heading>
        <Text color={'black.500'}>
        Sorry, your combination of choices filtered 0 results. Submit the Survey with another combination of choices
        </Text>
        <br />
    <Button
        color="white"
        variant="solid"
        colorScheme={'green'}
                    bg={'purple.400'}
                    px={6}
                    _hover={{
                    bg: 'purple.300',
                }}
        onClick={() => {
            navigate("/survey")
        }}>
        Go to Survey
    </Button>
    </Box>
    );
}