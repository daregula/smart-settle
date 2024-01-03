import React from 'react'
import { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Link,
    InputGroup,
    InputRightElement,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';


export const Login = (props) => {
    return (
        <div className="auth" style={{ flexGrow: "1"}}>
            <SimpleCard setCookies={props.setCookies}/>
        </div>
        
    )
}

export function SimpleCard(props) {
    const [showPassword, setShowPassword] = useState(false);
    const [loginStat, setloginStat] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    
    let isInvalid = false
    let userNotFound = false

    const navigate = useNavigate()

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            // grabbing the reponse form the api = json webtoken so we can authenticate the user 
            const response = await axios.post("http://localhost:3001/auth/login", {
                username,
                password
            })

            setloginStat(response.data.message)

            if (!(response.data.message === "password" || response.data.message === "username") ){
                // using cookies to authenticate if the user is signed in
                props.setCookies("access_token", response.data.token)
                // grabbing the unique userID from the db to use as an identifier for the user that is currently signed in
                window.localStorage.setItem("userID", response.data.userID)
                window.localStorage.setItem("username", response.data.username)
                window.localStorage.setItem("email", response.data.email)
                window.localStorage.setItem("firstname", response.data.firstname)
                window.localStorage.setItem("lastname", response.data.lastname)
                navigate("/")
                
            }
        } catch(err){
            console.error(err);
        }
    }
    
    return (
    <div>
    <form onSubmit={onSubmit} style={{position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)"}}>
    <Flex
        minH={'50vh'}
        align={'center'}
        justify={'center'}
    >
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
            isInvalid={loginStat === 'username' ? userNotFound=true : userNotFound=false}
            errorBorderColor='crimson'
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
                isInvalid={loginStat === 'password' ? isInvalid=true : isInvalid=false}
                errorBorderColor='crimson'
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
            
            <Link href='/resetpassword' color={'blue.400'}> Forgot password?</Link>
            </Stack>
            
            { isInvalid ? 
            <Text color={'crimson'}> Error: Invalid username or password. Try clicking 'Forgot Password' if you're having trouble signing in.</Text>
            : 
            userNotFound ? 
            <Text color={'crimson'}> Error: username not found sign up for an account today!</Text>
            :
            <></> }
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
    
    </div>
    );
}
