import React, { useState } from 'react'
import axios from "axios";
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom';
import '../styles/Survey.css'
import {
    Flex,
    Box,
    Select,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react';

export const Survey = () => {
    const userID = useGetUserID();

    const [response, setResponse] = useState({
        salary: "1",
        employment: "1",
        education: "1",
        weather: "1",
        transportation: "1",
        userOwner: userID
    });

    const navigate = useNavigate()


    const handleChange = (e) => {
        const {name, value} = e.target;
        setResponse({...response, [name] : value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3001/responses", response);
            alert("Responses stored")
            navigate("/results")
        } catch (err) {
            console.log(err);
        }
    }
    console.log(response)

    return (
        
        <div className='survey'>
            <form id="form" onSubmit={onSubmit}>
            <Flex
                minH={'75vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'xlg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                    Survey
                    </Heading>
                </Stack>
                <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <HStack>
                    <div class="form-control">
                    <FormLabel>Salary</FormLabel>
                    <Input type='text' id='salary' name='salary' onChange={handleChange} />
                </div>
                <div class="form-control">
                <FormLabel>Employment</FormLabel>
                    <Select type='text' id='employment' name='employment' onChange={handleChange}>
                        <option value="1">industry1</option>
                        <option value="2">industry2</option>
                        <option value="3">industry3</option>
                        <option value="4">industry4</option>
                        <option value="5">industry5</option>
                        <option value="6">industry6</option>
                        <option value="7">industry7</option>
                        <option value="8">industry8</option>
                        <option value="9">industry9</option>
                        <option value="10">industry10</option>
                    </Select>
                </div>
                </HStack>
                
                <HStack>
                <div class="form-control">
                    <FormLabel>Education</FormLabel>
                    <Select type='text' id='education' name='education' onChange={handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </Select>
                </div>

                <div class="form-control">
                    <FormLabel>Weather</FormLabel>   
                    <Select type='text' id='weather' name='weather' onChange={handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </Select>
                </div>
                </HStack>
                <div class="form-control">
                    <FormLabel>Transportation</FormLabel>
                    <Select type='text' id='transportation' name='transportation' onChange={handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </Select>
                </div>
                <Button
                type="submit"
                loadingText="Submitting"
                size="lg"
                bg={'purple.400'}
                color={'white'}
                _hover={{
                    bg: 'purple.300',
                }}>
                Submit
                </Button>
                </Box>
                </Stack>
                </Flex>
            </form>
            
        </div>
    )
}