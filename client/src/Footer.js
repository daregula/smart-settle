import React from 'react'
import './styles/Footer.css';
import logo from './images/logo.png';

import {
    Box,
    Container,
    SimpleGrid,
    Stack,
    Link,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import { ReactNode } from 'react';

export const Footer = () => {
    return (
        <LargeWithNewsletter />
    )
}

const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

const Logo = (props) => {
    return (
        <img src={logo} alt='' className='logo'></img>
    );
};

export default function LargeWithNewsletter() {
    return (
        <div>
            <Box
                mt="auto"
                bg={useColorModeValue('gray.50')}
                color={useColorModeValue('gray.700')}>
                <Container as={Stack} maxW={'6xl'} p={10}>
                    <SimpleGrid
                        templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
                        spacing={8}>
                        <Stack spacing={6}>
                        <Box>
                            <Logo color={useColorModeValue('gray.700', 'white')} />
                        </Box>
                        <Text fontSize={'sm'}>
                            © 2023 Smart Settle. All rights reserved
                        </Text>
                        </Stack>
                        <Stack align={'flex-start'}>
                        <ListHeader>Company</ListHeader>
                        <Link href={'/about'}>About us</Link>
                        <Link href={'/contact'}>Contact us</Link>
                        </Stack>
                        <Stack align={'flex-start'}>
                        <ListHeader>Support</ListHeader>
                        <Link href={'/terms'}>Terms of Service</Link>
                        <Link href={'/legal'}>Legal</Link>
                        <Link href={'/privacy'}>Privacy Policy</Link>
                        </Stack>
                    </SimpleGrid>
                </Container>
            </Box>
        </div>
    );
}