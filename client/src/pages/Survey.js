import React, { useState } from 'react'
import axios from "axios";
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom';
// import '../styles/Survey.css'
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
            {/* <h1>Survey</h1>
            <form id="form" onSubmit={onSubmit}>
                <div class="form-control">
                    <label htmlFor='salary'> Salary </label>
                    <input type='text' id='salary' name='salary' onChange={handleChange}></input>
                </div>
                <div class="form-control">
                    <label htmlFor='employment'> Employment </label>
                    <select type='text' id='employment' name='employment' onChange={handleChange}>
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
                    </select>
                </div>
                
                <div class="form-control">
                    <label htmlFor='education'> Education </label>
                    <select type='text' id='education' name='education' onChange={handleChange}>
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
                    </select>
                </div>

                <div class="form-control">
                    <label htmlFor='weather'> Weather </label>
                    <select type='text' id='weather' name='weather' onChange={handleChange}>
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
                    </select>
                </div>

                <div class="form-control">
                    <label htmlFor='transportation'> Transportation </label>
                    <select type='text' id='transportation' name='transportation' onChange={handleChange}>
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
                    </select>
                </div>
                    <button type='submit'> Submit </button>
            </form> */}
            
        </div>
    )
}


/*
Need to declare useState outside of form so that responses can be consistent among all forms
*/


    const Form1 = () => {
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
        const {name, value} = e.target || {};
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
        <>
        <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
            Survey
        </Heading>
        <Flex>
            <FormControl as='fieldset'>
            <FormLabel as='legend'>
                How much importance do you attribute to employment?
            </FormLabel>
                <RadioGroup name='employment'>
                    <HStack spacing='24px' onChange={handleChange}>
                    {/* <select type='text' id='employment' name='employment' onChange={handleChange}> */}
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
    
    const Form2 = () => {
    
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
                    <HStack spacing='24px' >
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
    
    const Form3 = () => {
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

    const Form4 = () => {
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

    const Form5 = () => {
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
    return (
        <>
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
            {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : step === 3 ? <Form3 /> : step === 4 ? <Form4 /> : step === 5 ? <Form5 /> : <Form6 />}
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
                    w="7rem"
                    colorScheme="red"
                    variant="solid"
                        onClick={() => {
                    toast({
                        title: 'Account created.',
                        description: "We've created your account for you.",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                    }}>
                    Submit
                </Button>
                ) : null}
            </Flex>
            </ButtonGroup>
        </Box>
        </>
    );
    }