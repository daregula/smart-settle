import React from 'react'
import { useState } from 'react';
import axios from "axios"
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';



export const Login = () => {
    return (
        <div className="auth">
            <SimpleCard />
        </div>
        
    )
}

export function SimpleCard() {
    const [showPassword, setShowPassword] = useState(false);

    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const [_, setCookies] = useCookies(["access_token"])

    const navigate = useNavigate()
    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            // grabbing the reponse form the api = json webtoken so we can authenticate the user 
            const response = await axios.post("http://localhost:3001/auth/login", {
                username,
                password
            })
            // using cookies to authenticate if the user is signed in
            setCookies("access_token", response.data.token)
            
            // grabbing the unique userID from the db to use as an identifier for the user that is currently signed in
            window.localStorage.setItem("userID", response.data.userID)
            navigate("/")
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
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
        to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
        </Stack>
        <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
        <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input 
            id="username"
            type="text"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            />
        </FormControl>
        <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input 
                id="password"
                type={showPassword ? 'text' : 'password'}
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                />
                <InputRightElement h={'full'}>
                    <Button
                    variant={'ghost'}
                    onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <Stack spacing={10}>
            <Stack
            direction={{ base: 'column', sm: 'row' }}
            align={'start'}
            justify={'space-between'}>
            <Checkbox>Remember me</Checkbox>
            <Link color={'blue.400'}>Forgot password?</Link>
            </Stack>
            <Button
            type="submit"
            bg={'purple.400'}
            color={'white'}
            _hover={{bg: 'purple.300'}}
            >
            Sign in
            </Button>
        </Stack>
            </Stack>
        </Box>
        </Stack>
    </Flex>
    </form>
    );
}
