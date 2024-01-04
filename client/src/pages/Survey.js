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
    FormLabel,
    Input,
    Select,
    RadioGroup,
    HStack,
    Radio,
    useToast,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons'

export const Survey = () => {
    return (
        <div className='survey' style={{ flexGrow: "1"}}>
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
                <Text>Enter a minimum salary of $55,000</Text>
                <Flex>
                    <FormControl mr="5%">
                    <Input
                    name='salary' 
                    type="number" 
                    placeholder="55000" 
                    min="55000" 
                    onChange={props.handleChange}/>
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
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                {("urban" === props.name || "suburban" === props.name) ? "Industires" : props.name}
                            </MenuButton>
                            <MenuList onClick={props.handleChange} sx={{overflow:"scroll"}} maxH='300px'>
                                <MenuItem maxH='38px' name="industry" value="Tech">
                                    Tech
                                </MenuItem >
                                <MenuItem maxH='38px' name="industry" value="Education">
                                    Education
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Healthcare">
                                    Healthcare
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Business">
                                    Business
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Administration">
                                    Administration
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Management">
                                    Management
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Therapy">
                                    Therapy
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Environment">
                                    Environment
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Construction">
                                    Construction 
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Design">
                                    Design
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Engineering">
                                    Engineering
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Financial services">
                                    Financial services
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Automotive">
                                    Automotive
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Beauty">
                                    Beauty
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Hospitality">
                                    Hospitality
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Languages">
                                    Languages
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Legal">
                                    Legal
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Manufacturing">
                                    Manufacturing
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Media">
                                    Media
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Publishing">
                                    Publishing
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Marketing">
                                    Marketing
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Retail">
                                    Retail
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Science">
                                    Science
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Security">
                                    Security
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Social Sciences">
                                    Social Sciences
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Sport">
                                    Sport 
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Transportation">
                                    Transportation
                                </MenuItem>
                                <MenuItem maxH='38px' name="industry" value="Fast Food">
                                    Fast Food
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
    const responseID = generateUniqueID();

    //date
    // const date = new Date();
    // let day = date.getDate();
    // let month = date.getMonth() + 1;
    // let year = date.getFullYear();
    
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
        responseID: responseID,
    });

    //Allows us to navigate when needed
    const navigate = useNavigate()

    const [one, setOne] = useState(true); 
    const [two, setTwo] = useState(true); 
    const [three, setThree] = useState(true); 
    const [name, setName] = useState(""); 
    
    
    //Uses onChange to grab what the user responded and sets the response based off the name : value
    const handleChange = (e) => {
        const { name, value } = e.target || {};
        setName(value)

        const updatePriority = (key) => {
            const currentPriority = response.priorities[0][key];
            if (value === "1") {
                if (currentPriority === "2") setTwo(true);
                if (currentPriority === "3") setThree(true);
                setOne(false);
            } else if (value === "2") {
                if (currentPriority === "1") setOne(true);
                if (currentPriority === "3") setThree(true);
                setTwo(false);
            } else if (value === "3") {
                if (currentPriority === "1") setOne(true);
                if (currentPriority === "2") setTwo(true);
                setThree(false);
            } else if (value === "Select priority") {
                if (currentPriority === "1") setOne(true);
                if (currentPriority === "2") setTwo(true);
                if (currentPriority === "3") setThree(true);
            }
            };
        
            if (name === "weatherPriority") {
            updatePriority("weatherPriority");
            setResponse({ ...response, priorities: [{ ...response.priorities[0], weatherPriority: value }] });
            } else if (name === "infrastructurePriority") {
            updatePriority("infrastructurePriority");
            setResponse({ ...response, priorities: [{ ...response.priorities[0], infrastructurePriority: value }] });
            } else if (name === "industryPriority") {
            updatePriority("industryPriority");
            setResponse({ ...response, priorities: [{ ...response.priorities[0], industryPriority: value }] });
            } else {
            setResponse({ ...response, [name]: value });
            }
    }
    
    const onSubmit = async (e) => {
        
        e.preventDefault();
        try {
            await axios.post("https://smart-settle-server.vercel.app/responses", response);
            const test = await axios.post("https://smart-settle-server.vercel.app/result", response, {
                timeout: 10000 // Timeout in milliseconds (adjust as needed)
            });
            if (!test.data.isGuest){
                const finalResult = await axios.post("https://smart-settle-server.vercel.app/result/savedResults", response);
                window.sessionStorage.setItem("responseID", finalResult.data)
                
                navigate("/results");
                }
            else {
                console.log(test.data.result);
                window.sessionStorage.setItem("responseID", "guest")
                await window.sessionStorage.setItem("guestData", JSON.stringify(test.data.result));

                navigate("/results");
            }
            } catch (err) {
                console.log(err, 'some bs');
            }
    }

    //Parent component that utilizes all previous components and submits all responses that were recorded
    return (
        <div>
            <FormControl onSubmit={onSubmit} style={{position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)"}}>
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
                        {step === 1 ? <Introduction handleChange={handleChange}/> : step === 2 ? <Priorities handleChange={handleChange} one={one} two={two} three={three}/> : step === 3 ? <Salary handleChange={handleChange}/> : step === 4 ? <Weather handleChange={handleChange}/> : step === 5 ? <Infrastructure handleChange={handleChange}/> : step === 6 ? <Industry name={name} handleChange={handleChange}/> : <Submit handleChange={handleChange}/>}
                        <ButtonGroup mt="5%" w="100%">
                        <Flex w="100%" justifyContent="space-between">
                            <Flex>
                            <Button
                                onClick={() => {
                                setStep(step - 1);
                                setProgress(progress - 14.285);
                                }}
                                isDisabled={step === 1 || step === 7}
                                colorScheme={'purple'}
                                bg={'purple.400'}
                                variant="solid"
                                w="7rem"
                                mr="5%">
                                Back
                            </Button>
                            {
                            ((one || two || three) && step === 2) || 
                            (step === 3 && (response.salary < 55000 || response.salary === "" || response.salary >= 1000000)) ||
                            (step === 4 && response.weather === "") ||
                            (step === 5 && response.infrastructure === "") ||
                            (step === 6 && response.industry === "") ?
                            (
                                <Button w="7rem" variant="outline" colorScheme='red'>Next</Button>
                            ) : 
                            (
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
                                colorScheme={'purple'}
                                color={'purple.600'}
                                variant="outline">
                                Next
                            </Button>
                            )}
                            

                            </Flex>
                            {step === 7 ? (
                            <Button
                                type="submit"
                                w="7rem"
                                colorScheme="green"
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

const generateUniqueID = () => {
    const timestamp = Date.now();

    // Generate a random number between 0 and 9999
    const randomNum = Math.floor(Math.random() * 10000);

    // Combine the timestamp and random number
    const uniqueNum = ('0000' + (timestamp + randomNum)).slice(-4);

    return uniqueNum;
}