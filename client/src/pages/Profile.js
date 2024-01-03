import React from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    HStack,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    InputRightElement,
    InputGroup,
    useToast
} from '@chakra-ui/react';
import axios from "axios"
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserID } from '../hooks/useGetUserID';


export const Profile = (props) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!props.cookie.access_token){
            navigate("/login");
            // alert("Must be logged into access this page");
        }
    }, [navigate, props.cookie.access_token])

    return (
        <SignupCard />
    )
}

export default function SignupCard() {
    const firstnameph = window.localStorage.getItem("firstname")
    const lastnameph = window.localStorage.getItem("lastname")
    const emailph = window.localStorage.getItem("email")
    const usernameph = window.localStorage.getItem("username")
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const toast = useToast();

    const userID = useGetUserID();

    const [updatedProfile, setUpdatedProfile] = useState({
        firstname: firstnameph,
        lastname: lastnameph,
        username: usernameph,
        oldpassword: "",
        newpassword: "",
        userID: userID
    });

    //Uses onChange to grab what the user responded and sets the response based off the name : value
    const handleChange = (e) => {
        const {name, value} = e.target || {};
        setUpdatedProfile({...updatedProfile, [name] : value})
    }

    //On submit, we make to API requests, one for handling previous searches, and one for sending data to backend in order to generate a result
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("https://smart-settle-server.vercel.app/edit-profile", updatedProfile);
            if(res.data.message === "Invalid Password"){
                alert("Invalid Password")
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
    <form onSubmit={onSubmit} style={{flexGrow: "1"}}>
        <Flex
            minH={'75vh'}
            align={'center'}
            justify={'center'}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                Edit Profile
                </Heading>
            </Stack>
            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>
                <HStack>
                    <Box>
                    <FormControl id="firstName" onChange={handleChange}>
                        <FormLabel>First Name</FormLabel>
                        <Input
                        name="firstname"
                        type="text"
                        placeholder={firstnameph}/>
                    </FormControl>
                    </Box>
                    <Box>
                    <FormControl id="lastName" onChange={handleChange}>
                        <FormLabel>Last Name</FormLabel>
                        <Input 
                        name="lastname"
                        type="text" 
                        placeholder={lastnameph}/>
                    </FormControl>
                    </Box>
                </HStack>
                <FormControl id="username" onChange={handleChange}>
                    <FormLabel>Username</FormLabel>
                    <Input
                    name="username"
                    type="text" 
                    placeholder={usernameph}
                    />
                </FormControl>
                <FormControl id="email" >
                    <FormLabel>Email address</FormLabel>
                    <Input 
                    id="email"
                    type="email" 
                    placeholder={emailph}
                    readOnly={emailph}
                    />
                </FormControl>

                <FormControl id="oldpassword" onChange={handleChange}>
                    <FormLabel>Old Password</FormLabel>
                    <InputGroup size='md'>
                    <Input 
                    type={show ? 'text' : 'password'}
                    name="oldpassword"
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                    </InputGroup>
                </FormControl>

                <FormControl id="newpassword" onChange={handleChange}>
                    <FormLabel>New Password</FormLabel>
                    <InputGroup size='md'>
                        <Input 
                        type={show ? 'text' : 'password'}
                        name="newpassword"
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                        </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                    <Button
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    bg={'purple.400'}
                    color={'white'}
                    _hover={{
                        bg: 'purple.300',
                        
                    }}
                    onClick={() => {
                        toast({
                            title: 'Profile Updated!',
                            description: "You've successfuly changed your profile.",
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                        });
                        }}
                        >
                    Save
                    </Button>
                </Stack>
                </Stack>
            </Box>
            </Stack>
        </Flex>
    </form>
    );
}