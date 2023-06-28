import React from 'react'
import {
    Flex,
    Box,
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
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from "axios"


export const SignUp = () => {
    
    return (
        <div className="auth">
            <SignupCard />
        </div>
        
    )
}

export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);

    // anytime the state of the username/password field is changed i.e. a new character is entered they variables are updated
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password,
                firstname,
                lastname,
                email
            })
            alert("Registration Complete")
        } catch(err){
            console.error(err);
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Flex
                    minH={'75vh'}
                    align={'center'}
                    justify={'center'}
                    bg={useColorModeValue('gray.50', 'gray.800')}>
                    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                        <HStack>
                            <Box>
                            <FormControl id="firstName" isRequired>
                                <FormLabel>First Name</FormLabel>
                                <Input
                                id="firstName"
                                type="text"
                                onChange={(event) => setFirstname(event.target.value)}
                                value={firstname}
                                />
                            </FormControl>
                            </Box>
                            <Box>
                            <FormControl id="lastName" isRequired>
                                <FormLabel>Last Name</FormLabel>
                                <Input 
                                id="lastName"
                                type="text" 
                                onChange={(event) => setLastname(event.target.value)}
                                value={lastname}
                                />
                            </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                            id="username"
                            type="text" 
                            onChange={(event) => setUsername(event.target.value)}
                            value={username}
                            />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input 
                            id="email"
                            type="email" 
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
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
                            Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                            Already a user? <Link color={'blue.400'}>Login</Link>
                            </Text>
                        </Stack>
                        </Stack>
                    </Box>
                    </Stack>
                </Flex>
            </form>
        </div>
    );
}