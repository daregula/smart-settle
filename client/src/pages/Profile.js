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
} from '@chakra-ui/react';
import axios from "axios"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


export const Profile = () => {
    const navigate = useNavigate()
    const [cookies, setCookies] = useCookies(["access_token"])

    if (!cookies.access_token){
        navigate("*")
    }

    return (
        <SignupCard />
    )
}

export default function SignupCard() {

    // anytime the state of the username/password field is changed i.e. a new character is entered they variables are updated
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const firstname = window.localStorage.getItem("firstname")
    const lastname = window.localStorage.getItem("lastname")
    const emailph = window.localStorage.getItem("email")
    const usernameph = window.localStorage.getItem("username")


    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                email
            })
            alert("Update successful")
        } catch(err){
            console.error(err);
        }
    }


    return (
    <form onSubmit={onSubmit}>
    <Flex
        minH={'75vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
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
                <FormControl id="firstName">
                    <FormLabel>First Name</FormLabel>
                    <Input
                    id="firstName"
                    type="text"
                    readonly={{firstname}}
                    placeholder={firstname}/>
                </FormControl>
                </Box>
                <Box>
                <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input 
                    id="lastName"
                    type="text" 
                    readonly={{lastname}}
                    placeholder={lastname}/>
                </FormControl>
                </Box>
            </HStack>
            <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                id="username"
                type="text" 
                onChange={(event) => setUsername(event.target.value)}
                value={username}
                placeholder={usernameph}
                />
            </FormControl>
            <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input 
                id="email"
                type="email" 
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                placeholder={emailph}
                />
            </FormControl>
            <Stack spacing={10} pt={2}>
                <Button
                loadingText="Submitting"
                size="lg"
                bg={'purple.400'}
                color={'white'}
                _hover={{
                    bg: 'purple.300',
                }}>
                Change Password
                </Button>
            </Stack>
            <Stack spacing={10} pt={2}>
                <Button
                type="submit"
                loadingText="Submitting"
                size="lg"
                bg={'purple.400'}
                color={'white'}
                _hover={{
                    bg: 'purple.300',
                }}>
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