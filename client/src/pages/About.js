import React from 'react'
import aboutImg from '../images/ChrisLitherlandBourbonSt.png'
import {
    Container,
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Button,
    Image
    } from '@chakra-ui/react';

export const About = () => {
    
    return (
        <div style={{ flexGrow: "1"}}>
            <Hero />
        </div>
    )
}

export const Hero = () => {
    
    return (
        <div >
            <Container maxW={'7xl'}>
                <Stack
                    align={'center'}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 20, md: 28 }}
                    direction={{ base: 'column', md: 'row' }}>
                    <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{ base: '3xl', sm: '4xl', lg: '5xl' }}>
                        <Text
                        as={'span'}
                        position={'relative'}
                        _after={{
                            content: "''",
                            width: 'full',
                            height: '30%',
                            position: 'absolute',
                            bottom: 1,
                            left: 0,
                            bg: 'purple.400',
                            zIndex: -1,
                        }}>
                        Find your next
                        </Text>
                        <br />
                        <Text as={'span'} color={'purple.400'}>
                        dream home!
                        </Text>
                    </Heading>
                    <Text color={'gray.500'}>
                        Welcome to our advanced location finder that tailors 
                        the search based on your unique preferences.
                        Simply tell us your specific requirements, 
                        and we'll analyze data from various factors to 
                        recommend the most optimal place for you to live.
                        Whether you prioritize affordable housing, great schools, 
                        vibrant nightlife, or serene natural surroundings, 
                        our algorithm will match you with your ideal location. 
                        Begin your journey to find your perfect home now!
                    </Text>
                    <Button
                        as={'a'}
                        size={'lg'}
                        fontWeight={'normal'}
                        px={6}
                        colorScheme={'purple'}
                        bg={'purple.400'}
                        _hover={{ bg: 'purple.300' }}
                        w={'sm'}
                        m ='auto'
                        href={"/survey"}
                        >
                        Get started
                    </Button>
                    </Stack>
                    <Flex
                    flex={1}
                    justify={'center'}
                    align={'center'}
                    position={'relative'}
                    w={'full'}>
                    <Box
                        position={'relative'}
                        height={'500px'}
                        rounded={'2xl'}
                        boxShadow={'2xl'}
                        width={'full'}
                        overflow={'hidden'}>
                        <Image
                        alt={'Hero Image'}
                        fit={'cover'}
                        align={'center'}
                        w={'100%'}
                        h={'100%'}
                        src={aboutImg}
                        />
                    </Box>
                    </Flex>
                </Stack>
            </Container>
        </div>
    )
}