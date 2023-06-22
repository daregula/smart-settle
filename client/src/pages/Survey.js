import React, { useState } from 'react'
import axios from "axios";
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom';

import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Heading,
    Flex,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    Select,
    SimpleGrid,
    InputLeftAddon,
    InputGroup,
    Textarea,
    FormHelperText,
    InputRightElement,
    FormErrorMessage,
    RadioGroup,
    HStack,
    Radio
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';


export const Survey = () => {
    return (
        <div className='survey'>
            <Multistep />
        </div>
    )
}

    //Created Forms that will later be called and displayed individually in the parent component
    const Form1 = (props) => {
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
            Enter your yearly salary
            </Heading>
            <Flex>
                <FormControl mr="5%">
                <Input name='salary' placeholder="40000" onChange={props.handleChange}/>
                </FormControl>
            </Flex>
        </>
    );
    };
    
    const Form2 = (props) => {
    
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Survey
            </Heading>
            <Flex>
                <FormControl as='fieldset'>
                <FormLabel as='legend'>
                    How much importance do you attribute to education?
                    </FormLabel>
                    <RadioGroup name='employment'  >
                        <HStack spacing='24px' onChange={props.handleChange}>
                        <p>Not Important</p>
                        <Radio value='1'>1</Radio>
                        <Radio value='2'>2</Radio>
                        <Radio value='3'>3</Radio>
                        <Radio value='4'>4</Radio>
                        <Radio value='5'>5</Radio>
                        <Radio value='6'>6</Radio>
                        <Radio value='7'>7</Radio>
                        <Radio value='8'>8</Radio>
                        <Radio value='9'>9</Radio>
                        <Radio value='10'>10</Radio>
                        <p>Very Important</p>
                        </HStack>
                    </RadioGroup>
                </FormControl>
            </Flex>
        </>
    );
    };
    
    const Form3 = (props) => {
    return (
        <>
        <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
            Survey
        </Heading>
        <Flex>
            <FormControl as='fieldset'>
            <FormLabel as='legend'>
                How much importance do you attribute to education?
                </FormLabel>
                <RadioGroup name='education' >
                    <HStack spacing='24px' onChange={props.handleChange}>
                    <p>Not Important</p>
                    <Radio value='1'>1</Radio>
                    <Radio value='2'>2</Radio>
                    <Radio value='3'>3</Radio>
                    <Radio value='4'>4</Radio>
                    <Radio value='5'>5</Radio>
                    <Radio value='6'>6</Radio>
                    <Radio value='7'>7</Radio>
                    <Radio value='8'>8</Radio>
                    <Radio value='9'>9</Radio>
                    <Radio value='10'>10</Radio>
                    <p>Very Important</p>
                    </HStack>
                </RadioGroup>
            </FormControl>
        </Flex>
        </>
    );
    };

    const Form4 = (props) => {
    return (
        <>
        <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
            Survey
        </Heading>
        <Flex>
            <FormControl as='fieldset'>
            <FormLabel as='legend'>
                How much importance do you attribute to education?
                </FormLabel>
                <RadioGroup name='weather' >
                    <HStack spacing='24px' onChange={props.handleChange}>
                    <p>Not Important</p>
                    <Radio value='1'>1</Radio>
                    <Radio value='2'>2</Radio>
                    <Radio value='3'>3</Radio>
                    <Radio value='4'>4</Radio>
                    <Radio value='5'>5</Radio>
                    <Radio value='6'>6</Radio>
                    <Radio value='7'>7</Radio>
                    <Radio value='8'>8</Radio>
                    <Radio value='9'>9</Radio>
                    <Radio value='10'>10</Radio>
                    <p>Very Important</p>
                    </HStack>
                </RadioGroup>
            </FormControl>
        </Flex>
        </>
    );
    };

    const Form5 = (props) => {
    return (
        <>
        <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
            Survey
        </Heading>
        <Flex>
            <FormControl as='fieldset'>
            <FormLabel as='legend'>
                How much importance do you attribute to education?
                </FormLabel>
                <RadioGroup name='transportation'>
                    <HStack spacing='24px' onChange={props.handleChange}>
                    <p>Not Important</p>
                    <Radio value='1'>1</Radio>
                    <Radio value='2'>2</Radio>
                    <Radio value='3'>3</Radio>
                    <Radio value='4'>4</Radio>
                    <Radio value='5'>5</Radio>
                    <Radio value='6'>6</Radio>
                    <Radio value='7'>7</Radio>
                    <Radio value='8'>8</Radio>
                    <Radio value='9'>9</Radio>
                    <Radio value='10'>10</Radio>
                    <p>Very Important</p>
                    </HStack>
                </RadioGroup>
            </FormControl>
        </Flex>
        </>
    );
    };

    const Form6 = () => {
    return (
        <>
        <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
            Survey
        </Heading>
        <Flex>
            <FormControl as='fieldset'>
            <FormLabel as='legend'>
                How much importance do you attribute to weather?
                </FormLabel>
                <RadioGroup defaultValue='Itachi'>
                    <HStack spacing='24px'>
                    <p>Not Important</p>
                    <Radio value='1'>1</Radio>
                    <Radio value='2'>2</Radio>
                    <Radio value='3'>3</Radio>
                    <Radio value='4'>4</Radio>
                    <Radio value='5'>5</Radio>
                    <Radio value='6'>6</Radio>
                    <Radio value='7'>7</Radio>
                    <Radio value='8'>8</Radio>
                    <Radio value='9'>9</Radio>
                    <Radio value='10'>10</Radio>
                    <p>Very Important</p>
                    </HStack>
                </RadioGroup>
            </FormControl>
        </Flex>
        </>
    );
    };
    
    export default function Multistep() {
    const toast = useToast();
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(16.66);

    //Used custom hook to fetch userID and created useState for recording responses with default values
    const userID = useGetUserID();
    const [response, setResponse] = useState({
        salary: "1",
        employment: "1",
        education: "1",
        weather: "1",
        transportation: "1",
        userOwner: userID
    });

    //Allows us to navigate when needed
    const navigate = useNavigate()

    //Uses onChange to grab what the user responded and sets the response based off the name : value
    const handleChange = (e) => {
        const {name, value} = e.target || {};
        setResponse({...response, [name] : value})
    }

    //On submit, we make to API requests, one for handling previous searches, and one for sending data to backend in order to generate a result
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3001/responses", response);
            await axios.post("http://localhost:3001/result", response);
            navigate("/results")
        } catch (err) {
            console.log(err);
        }
    }

    //Parent component that utilizes all previous components and submits all responses that were recorded
    return (
        <>
            <FormControl onSubmit={onSubmit}>
                <Box
                    borderWidth="1px"
                    rounded="lg"
                    shadow="1px 1px 3px rgba(0,0,0,0.3)"
                    maxWidth={800}
                    p={6}
                    m="10px auto"
                    as="form">
                    <Progress
                    hasStripe
                    value={progress}
                    mb="5%"
                    mx="5%"
                    isAnimated></Progress>
                    {step === 1 ? <Form1 handleChange={handleChange}/> : step === 2 ? <Form2 handleChange={handleChange}/> : step === 3 ? <Form3 handleChange={handleChange}/> : step === 4 ? <Form4 handleChange={handleChange}/> : step === 5 ? <Form5 handleChange={handleChange}/> : <Form6 handleChange={handleChange}/>}
                    <ButtonGroup mt="5%" w="100%">
                    <Flex w="100%" justifyContent="space-between">
                        <Flex>
                        <Button
                            onClick={() => {
                            setStep(step - 1);
                            setProgress(progress - 16.66);
                            }}
                            isDisabled={step === 1}
                            colorScheme="teal"
                            variant="solid"
                            w="7rem"
                            mr="5%">
                            Back
                        </Button>
                        <Button
                            w="7rem"
                            isDisabled={step === 6}
                            onClick={() => {
                            setStep(step + 1);
                            if (step === 6) {
                                setProgress(100);
                            } else {
                                setProgress(progress + 16.66);
                            }
                            }}
                            colorScheme="teal"
                            variant="outline">
                            Next
                        </Button>
                        </Flex>
                        {step === 6 ? (
                        <Button
                            type="submit"
                            w="7rem"
                            colorScheme="red"
                            variant="solid"
                            onClick={() => {
                                toast({
                                    title: 'Survey complete.',
                                    description: "We've stored your answers!",
                                    status: 'success',
                                    duration: 3000,
                                    isClosable: true,
                                });
                                }}
                            >
                            Submit
                        </Button>
                        ) : null}
                    </Flex>
                    </ButtonGroup>
                </Box>
            </FormControl>
        </>
    );
    }