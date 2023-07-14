import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    IconButton,
    Button,
    VStack,
    HStack,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
} from '@chakra-ui/react'
import {
    MdEmail,
    MdLocationOn,
    MdFacebook,
    MdOutlineEmail,
} from 'react-icons/md'
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs'

export const Contact = () => {
    return (
        <ContactForm />
    )
}

export function ContactForm() {
    const [name, setName] = useState("")
    const [from, setFrom] = useState("")
    const [body, setBody] = useState("")

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            // grabbing the reponse form the api = json webtoken so we can authenticate the user 
            const response = await axios.post("http://localhost:3001/smtp/support", {
                from,
                body,
                name
            })

            alert("Email Sent")
            
        } catch(err){
            console.error(err);
        }
    }

    return (
    <Container bg="white" maxW="full" mt={0} centerContent overflow="hidden" style={{ flexGrow: "1"}}>
    <form onSubmit={onSubmit}>
    <Flex>
        <Box
        bg="white.100"
        color="#0B0E3F"
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        m={{ sm: 4, md: 16, lg: 10 }}
        p={{ sm: 5, md: 5, lg: 16 }}>
        <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
            <WrapItem>
                <Box>
                <Heading>Contact</Heading>
                <Text mt={{ sm: 3, md: 3, lg: 5 }} color="#0B0E3F">
                    Fill out the form for support
                </Text>
                <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start">
                    <Button
                        size="md"
                        height="48px"
                        width="300px"
                        variant="ghost"
                        color="#0B0E3F"
                        leftIcon={<MdEmail color="#BA68C8" size="20px" />}>
                        smrtstl.sup@gmail.com
                    </Button>
                    <Button
                        size="md"
                        height="48px"
                        width="230px"
                        variant="ghost"
                        color="#0B0E3F"
                        leftIcon={<MdLocationOn color="#BA68C8" size="20px" />}>
                        Miami, Florida
                    </Button>
                    </VStack>
                </Box>
                <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={5}
                    alignItems="flex-start">
                    <IconButton
                    aria-label="facebook"
                    variant="ghost"
                    size="lg"
                    isRound={true}
                    _hover={{ bg: 'purple.300' }}
                    icon={<MdFacebook size="28px" />}
                    />
                    <IconButton
                    aria-label="github"
                    variant="ghost"
                    size="lg"
                    isRound={true}
                    _hover={{ bg: 'purple.300' }}
                    icon={<BsGithub size="28px" />}
                    />
                    <IconButton
                    aria-label="discord"
                    variant="ghost"
                    size="lg"
                    isRound={true}
                    _hover={{ bg: 'purple.300' }}
                    icon={<BsDiscord size="28px" />}
                    />
                </HStack>
                </Box>
            </WrapItem>
            <WrapItem>
                <Box bg="white" borderRadius="lg">
                <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                    <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
                        />
                        <Input type="text" 
                        size="md" 
                        onChange={(event) => setName(event.target.value)}
                        value={name}
                        />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="name">
                        <FormLabel>Email</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<MdOutlineEmail color="gray.800" />}
                        />
                        <Input 
                        type="text" 
                        size="md" 
                        onChange={(event) => setFrom(event.target.value)}
                        value={from}
                        />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="name">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                        borderColor="gray.300"
                        _hover={{
                            borderRadius: 'gray.300',
                        }}
                        placeholder="message"
                        onChange={(event) => setBody(event.target.value)}
                        value={body}
                        />
                    </FormControl>
                    <FormControl id="name" float="right">
                        <Button
                        variant="solid"
                        bg="purple.400"
                        color="white"
                        _hover={{bg: "purple.300"}}
                        type="submit"
                        >
                        Send Message
                        </Button>
                    </FormControl>
                    </VStack>
                </Box>
                </Box>
            </WrapItem>
            </Wrap>
        </Box>
        </Box>
    </Flex>
    </form>
    </Container>
);
}