import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const ResetPassword = () => {
    return (
        <Reset />
    )
}
export function Reset() {
    const [email, setEmail] = useState("")


    const onSubmit = async (event) => {
            event.preventDefault()
            // first check if the user email is tied to an account
            let user;
            try{
                user = await axios.post("http://localhost:3001/auth/verify",{email})
                console.log(user)
            }
            catch(err){
                console.error(err)
            }

            if (!user.data){
                alert("The email you entered is not associated with an account")
            }
            else{
                try{
                    const response = await axios.post("http://localhost:3001/smtp/tempPwd",{email})
                    alert("Check email for secure code")
                }
                catch(err){
                    console.error(err)
                }
            }
            // after user is authenticated then proceed with the password reset
                
        }

    return (
    <div>
        <FormControl onSubmit={onSubmit}>
            <Flex
                minH={'75vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Enter an email associated with your account</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <Input 
                    id="email" 
                    type="text"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                    />
                </FormControl>
                <Stack spacing={10}>
                    <Button
                    type="submit"
                    bg={'purple.400'}
                    color={'white'}
                    _hover={{bg: 'purple.300'}}
                    >
                    Submit
                    </Button>
                </Stack>
                    </Stack>
                </Box>
                </Stack>
            </Flex>
        </FormControl>
    </div>
    );
}