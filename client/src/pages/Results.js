import React, {useEffect, useState, useMemo} from 'react'
import axios from 'axios';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
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
    const responseID = useMemo(() => ({ responseID: window.sessionStorage.getItem("responseID")}), []);
    
    useEffect(() => {
    const fetchSavedResults = async () => {
        if (responseID.responseID !== "guest"){
            try {
            // fourth and sixth
            const response = await axios.post("http://localhost:3001/result/getResults", responseID)
            
            setResults(response.data)
            } catch (err) {
                console.log(err);
            }
        }
        else {
            let res = await window.sessionStorage.getItem("guestData");
            res = JSON.parse(res);
            setResults(res)
        }
        
    };
    fetchSavedResults();
    }, [responseID]);


    if (results.length > 0) {
        return (
            <div style={{ flexGrow: "1" }}>
                <SimpleGrid columns={3}>
                    {results.map((resultItem, index) => {
                        const { city_name, state, cost_of_living, averageTemperature, population, availableJobs, additionalData } = resultItem;
                        return (
                            <BlogPostWithImage
                                key={index} // Add a unique key prop
                                city_name={city_name}
                                state={state}
                                cost_of_living={cost_of_living}
                                averageTemperature={averageTemperature}
                                population={population}
                                availableJobs={availableJobs}
                                additionalData={additionalData}
                            />
                        );
                    })}
                </SimpleGrid>
            </div>
        );
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
                overflow={'hidden'}
            >
            <Box
                h={'210px'}
                bg={'gray.100'}
                mt={-6}
                mx={-6}
                mb={6}
                pos={'relative'}
            >
            <Image
                alt='city/State Image'
                h = '230px'
                w = '500px'
                src={props.additionalData.image}
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
                    Average Temperature: {props.averageTemperature}F
                    <br />
                    Population: {props.population}
                    <br />
                    Number of Jobs: {props.availableJobs}
                    <br />
                    Total repoted crimes in the past year: {props.additionalData.crimeCount}
                    <br />
                </Text>
                    <Popover>
                        <PopoverTrigger>
                            <Button
                                color={'white'}
                                bg={'purple.400'}
                                m={1}
                                _hover={{bg: 'purple.300'}}>
                                Entertainment
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                        <PopoverCloseButton />
                            <PopoverHeader>Nearby Popular Eats</PopoverHeader>
                            <ul>
                                <PopoverBody>
                                    {props.additionalData.pointsOfInterest.map((listItems, index) => {
                                        return (
                                                <li key={`poi_${index}`}>
                                                    {listItems}
                                                </li>
                                            )
                                    })}
                                </PopoverBody>
                            </ul>
                        </PopoverContent>
                    </Popover>
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