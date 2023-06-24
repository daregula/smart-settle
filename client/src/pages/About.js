import React from 'react'
import aboutImg from '../images/ChrisLitherlandBourbonSt.png'
import { Image, SimpleGrid, GridItem, Box, Center, Text, Heading, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const About = () => {
    return (
        <body>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            <div>
            This is the about page
            </div>
            <div>
                
            </div>
        </body>
        
=======
            <Temp />
        </body>
>>>>>>> a308b35a296593af2322f319dca6e4d87be8bfd8
=======
            <Temp />
        </body>
>>>>>>> a308b35a296593af2322f319dca6e4d87be8bfd8
=======
            <Temp />
        </body>
>>>>>>> a308b35a296593af2322f319dca6e4d87be8bfd8
=======
            <Temp />
        </body>
>>>>>>> a308b35a296593af2322f319dca6e4d87be8bfd8
    )
}

export const Temp = () => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    return (
        <div>
            <image>
                
            </image>
        </div>
=======
=======
>>>>>>> a308b35a296593af2322f319dca6e4d87be8bfd8
=======
>>>>>>> a308b35a296593af2322f319dca6e4d87be8bfd8
=======
>>>>>>> a308b35a296593af2322f319dca6e4d87be8bfd8
    const navigate = useNavigate()
    return (
        <Box position='relative' h='100px'>
            <Center p='14' axis='both' m='auto'>
                <SimpleGrid columns={2}>
                        <Box ml= '300' bg='gray.100' borderRadius='lg' width='50vh' p ='4' height='550px'>
                            <Heading size='lg'p='10'>
                            Discover Your Perfect Place to Live!
                            </Heading>
                            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
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
                            <Box>
                            <Button
                                onClick={() => navigate("/survey")}
                                mt='5'
                                color={'white'}
                                bg={'purple.400'}
                                rounded={'lg'}
                                px={16}
                                _hover={{bg:'purple.300'}}
                                to="">
                                Get Started
                            </Button>
                            </Box>
                        </Box>
                        <Box mr='100'>
                            <Image src={aboutImg} 
                            alt='city street image' 
                            boxSize='60vh' 
                            borderRadius='xl'
                            width='100%'
                            />
                            
                        </Box>
                        
                </SimpleGrid>
            </Center>
        </Box>       
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> a308b35a296593af2322f319dca6e4d87be8bfd8
=======
>>>>>>> a308b35a296593af2322f319dca6e4d87be8bfd8
=======
>>>>>>> a308b35a296593af2322f319dca6e4d87be8bfd8
=======
>>>>>>> a308b35a296593af2322f319dca6e4d87be8bfd8
    )
}