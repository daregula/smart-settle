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
    Radio,
    useToast,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Text
    
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons'


export const Survey = () => {
    return (
        <div className='survey'>
            <Multistep />
        </div>
    )
}

    //Created Forms that will later be called and displayed individually in the parent component
    const Introduction = (props) => {
        return (
            <>
                <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                    Survey
                </Heading>
                <Text
                    fontSize={{ base: 'xl', md: '2xl' }}
                    textAlign={'center'}
                    maxW={'3xl'}>
                    Welcome to our survey on finding the best city to live in! 
                    We value your input and would like to gather some essential details from you. 
                    Your responses will play a crucial role in helping us understand your preferences and expectations, enabling us to identify the city that suits your needs best. 
                    So, let's begin exploring your ideal living environment! Please take a few minutes to answer the following questions to the best of your ability.
                </Text>
            </>
        );
    };

        const Priorities = (props) => {
        console.log("start")
        console.log(props.one)
        console.log(props.two)
        console.log(props.three)
        console.log("end")
        return (
            <>  
                <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                    Priorities
                </Heading>
                <Flex>
                    <FormControl as='fieldset'>
                        <Text
                            fontSize={{ base: 'xl', md: '2xl' }}
                            textAlign={'center'}
                            maxW={'3xl'}>
                            Rate these categories from lowest to highest priority
                            <br />
                            (1: Highest, 3: Lowest)
                        </Text>
                        <FormLabel>Weather</FormLabel>
                            <Select name="weatherPriority" onChange={props.handleChange}>
                                <option>Select priority</option>

                                {!props.one ? <option disabled>1</option> 
                                :<option>1</option>}

                                {!props.two ? <option disabled>2</option> 
                                :<option>2</option>}

                                {!props.three ? <option disabled>3</option> 
                                :<option>3</option>}
                            </Select>
                        <br />
                        <FormLabel>Infrastructure</FormLabel>
                            <Select name="infrastructurePriority" onChange={props.handleChange}>
                                <option>Select priority</option>

                                {!props.one ? <option disabled>1</option> 
                                :<option>1</option>}

                                {!props.two ? <option disabled>2</option> 
                                :<option>2</option>}

                                {!props.three ? <option disabled>3</option> 
                                :<option>3</option>}
                            </Select>
                        <br />
                        <FormLabel>Industry</FormLabel>
                            <Select name="industryPriority" onChange={props.handleChange}>
                                <option>Select priority</option>

                                {!props.one ? <option disabled>1</option> 
                                :<option>1</option>}

                                {!props.two ? <option disabled>2</option> 
                                :<option>2</option>}

                                {!props.three ? <option disabled>3</option> 
                                :<option>3</option>}
                            </Select>
                    </FormControl>
                </Flex>
            </>
        );
    };

    const Salary = (props) => {
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

    const Weather = (props) => {
        const cool = "<70"
        const warm = ">70"
        return (
            <>
                <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                    Weather
                </Heading>
                <Text
                    fontSize={{ base: 'xl', md: '2xl' }}
                    textAlign={'center'}
                    maxW={'3xl'}>
                    Do you prefer cooler or warmer weather?
                    <br />
                    (Cooler: {cool} | Warmer: {warm})
                </Text>
                <br />
                <Flex>
                    <FormControl as='fieldset'>
                        <RadioGroup name='weather' >
                            <HStack spacing='24px' onChange={props.handleChange}>
                            <Radio value='cool'>Cooler</Radio>
                            <Radio value='warm'>Warmer</Radio>
                            </HStack>
                        </RadioGroup>
                    </FormControl>
                </Flex>
            </>
        );
    };
    
    
    const Infrastructure = (props) => {
        const urban = ">35000";
        const suburban = "<35000";
        return (
            <>
                <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                    Infrastructure
                </Heading>
                <Flex>
                    <FormControl as='fieldset'>
                        <Text
                        fontSize={{ base: 'xl', md: '2xl' }}
                        textAlign={'center'}
                        maxW={'3xl'}>
                            Do you prefer an urban or suburban setting?
                            <br />
                            (Urban: {urban} | Suburban: {suburban})
                        </Text>
                        <br />
                        <RadioGroup name='infrastructure'>
                            <HStack spacing='24px' onChange={props.handleChange}>
                            <Radio value='urban'>Urban</Radio>
                            <Radio value='suburban'>Suburban</Radio>
                            </HStack>
                        </RadioGroup>
                    </FormControl>
                </Flex>
            </>
        );
    };

    const Industry = (props) => {
        return (
            <>
                <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                    Industry
                </Heading>
                <Flex>
                    <FormControl as='fieldset'>
                    <Text
                            fontSize={{ base: 'xl', md: '2xl' }}
                            textAlign={'center'}
                            maxW={'3xl'}>
                            Select the industry that you plan to work in.
                        </Text>
                        <br />
                        <Menu >
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} >
                                Industries
                            </MenuButton>
                            <MenuList onClick={props.handleChange}>
                                <MenuItem minH='48px' name="industry" value="tech">
                                    <span>Tech</span>
                                </MenuItem >
                                <MenuItem minH='40px' name="industry" value="education">
                                    <span>Education</span>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </FormControl>
                </Flex>
            </>
        );
    };

    const Submit = (props) => {
        return (
            <>
                <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                    Thank you!
                </Heading>
                <Text
                    fontSize={{ base: 'xl', md: '2xl' }}
                    textAlign={'center'}
                    maxW={'3xl'}>
                    Thank you for taking the time to complete the survey!
                    <br />
                    We will record your answers and process your information to give you the best city to live in based off your answers.
                    <br />
                    Click "Submit" and give us a couple of seconds to return your result!
                </Text>
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
        salary: 0,
        weather: "",
        infrastructure: "",
        industry: "",
        priorities: [{
            weatherPriority: "",
            infrastructurePriority: "",
            industryPriority: ""
        }],
        userOwner: userID,
    });

    //Allows us to navigate when needed
    const navigate = useNavigate()

    const [one, setOne] = useState(true); 
    const [two, setTwo] = useState(true); 
    const [three, setThree] = useState(true); 
    

    //Uses onChange to grab what the user responded and sets the response based off the name : value
    const handleChange = (e) => {
        let {name, value} = e.target || {};
        if(name === "weatherPriority") {
            // dict[weatherp] = value
            if (value === "1"){
                if (response.priorities[0]['weatherPriority'] === "2"){
                    setTwo(true)
                }
                if (response.priorities[0]['weatherPriority'] === "3"){
                    setThree(true)
                }
                setOne(false);
                
                
            }
            if (value === "2"){
                if (response.priorities[0]['weatherPriority'] === "1"){
                    setOne(true)
                }
                if (response.priorities[0]['weatherPriority'] === "3"){
                    setThree(true)
                }
                setTwo(false);
                
                
            }
            if (value === "3"){
                if (response.priorities[0]['weatherPriority'] === "1"){
                    console.log("trig")
                    setOne(true)
                }
                if (response.priorities[0]['weatherPriority'] === "2"){
                    setTwo(true)
                }
                setThree(false);
                
            }
            if (value === "Select priority"){
                if (response.priorities[0]['weatherPriority'] === "1"){
                    setOne(true)
                }
                if (response.priorities[0]['weatherPriority'] === "2"){
                    setTwo(true)
                }
                if (response.priorities[0]['weatherPriority'] === "3"){
                    setThree(true)
                }
                
                // response.priorities[0]['weatherPriority'] === "1" ? setOne(true) :
                // response.priorities[0]['weatherPriority'] === "2" ? setTwo(true) :
                // response.priorities[0]['weatherPriority'] === "3" ? setThree(true) :
                // console.log()

            }

            setResponse({...response, priorities: [{ ...response.priorities[0], weatherPriority: value }]});
            
        }
        else if(name === "infrastructurePriority"){
            if (value === "1"){
                if (response.priorities[0]['infrastructurePriority'] === "2"){
                    setTwo(true)
                }
                if (response.priorities[0]['infrastructurePriority'] === "3"){
                    setThree(true)
                }
                setOne(false);
                
            }
            if (value === "2"){
                if (response.priorities[0]['infrastructurePriority'] === "1"){
                    setOne(true)
                }
                if (response.priorities[0]['infrastructurePriority'] === "3"){
                    setThree(true)
                }
                setTwo(false);
                
                
            }
            if (value === "3"){
                if (response.priorities[0]['infrastructurePriority'] === "1"){
                    setOne(true)
                }
                if (response.priorities[0]['infrastructurePriority'] === "2"){
                    setTwo(true)
                }
                setThree(false);
                
            }
            if (value === "Select priority"){
                if (response.priorities[0]['infrastructurePriority'] === "1"){
                    setOne(true)
                }
                if (response.priorities[0]['infrastructurePriority'] === "2"){
                    setTwo(true)
                }
                else if (response.priorities[0]['infrastructurePriority'] === "3"){
                    setThree(true)
                }
            // response.priorities[0]['infrastructurePriority'] === "1" ? setOne(true) :
            // response.priorities[0]['infrastructurePriority'] === "2" ? setTwo(true) :
            // response.priorities[0]['infrastructurePriority'] === "3" ? setThree(true) :
            // console.log()
            }
            setResponse({...response, priorities: [{ ...response.priorities[0], infrastructurePriority: value }]});
            
        }
        else if(name === "industryPriority"){
            if (value === "1"){
                if (response.priorities[0]['industryPriority'] === "2"){
                    setTwo(true)
                }
                if (response.priorities[0]['industryPriority'] === "3"){
                    setThree(true)
                }
                setOne(false);
                
                
            }
            if (value === "2"){
                if (response.priorities[0]['industryPriority'] === "1"){
                    setOne(true)
                }
                if (response.priorities[0]['industryPriority'] === "3"){
                    setThree(true)
                }
                setTwo(false);
                
                
            }
            if (value === "3"){
                if (response.priorities[0]['industryPriority'] === "1"){
                    setOne(true)
                }
                if (response.priorities[0]['industryPriority'] === "2"){
                    setTwo(true)
                }
                setThree(false);
                
            }
            if (value === "Select priority"){
                if (response.priorities[0]['industryPriority'] === "1"){
                    setOne(true)
                }
                if (response.priorities[0]['industryPriority'] === "2"){
                    setTwo(true)
                }
                if (response.priorities[0]['industryPriority'] === "3"){
                    setThree(true)
                }
            // response.priorities[0]['industryPriority'] === "1" ? setOne(true) :
            // response.priorities[0]['industryPriority'] === "2" ? setTwo(true) :
            // response.priorities[0]['industryPriority'] === "3" ? setThree(true) :
            // console.log()
            }
            setResponse({...response, priorities: [{ ...response.priorities[0], industryPriority: value }]});
        }
        else {
            setResponse({...response, [name] : value})
        }
        
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
        <div>
            <FormControl onSubmit={onSubmit}>
                <FormControl>
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
                        {step === 1 ? <Introduction handleChange={handleChange}/> : step === 2 ? <Priorities handleChange={handleChange} one={one} two={two} three={three}/> : step === 3 ? <Salary handleChange={handleChange}/> : step === 4 ? <Weather handleChange={handleChange}/> : step === 5 ? <Infrastructure handleChange={handleChange}/> : step === 6 ? <Industry handleChange={handleChange}/> : <Submit handleChange={handleChange}/>}
                        <ButtonGroup mt="5%" w="100%">
                        <Flex w="100%" justifyContent="space-between">
                            <Flex>
                            <Button
                                onClick={() => {
                                setStep(step - 1);
                                setProgress(progress - 14.285);
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
                                isDisabled={step === 7}
                                onClick={() => {
                                setStep(step + 1);
                                if (step === 6) {
                                    setProgress(100);
                                } else {
                                    setProgress(progress + 14.285);
                                }
                                }}
                                colorScheme="teal"
                                variant="outline">
                                Next
                            </Button>
                            </Flex>
                            {step === 7 ? (
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
            </FormControl>
        </div>
    );
    }