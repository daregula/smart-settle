import React from 'react'
import './styles/Footer.css';
import logo from './images/logo.png';

import {
    Box,
    chakra,
    Container,
    SimpleGrid,
    Stack,
    Link,
    Text,
    VisuallyHidden,
    useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

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

const Logo = (props: any) => {
    return (
        <img src={logo} alt='' className='logo'></img>
    );
};

const SocialButton = ({
    children,
    label,
    href,
}: {
    children: ReactNode;
    label: string;
    href: string;
}) => {
    return (
    <chakra.button
        bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
        rounded={'full'}
        w={8}
        h={8}
        cursor={'pointer'}
        as={'a'}
        href={href}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        transition={'background 0.3s ease'}
        _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        }}>
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
    </chakra.button>
    );
};

export default function LargeWithNewsletter() {
    return (
        <div>
            <Box
                style={{ position: "fixed", bottom: "0", width: "100%"}}
                bg={useColorModeValue('gray.50', 'gray.900')}
                color={useColorModeValue('gray.700', 'gray.200')}>
                <Container as={Stack} maxW={'6xl'} py={10}>
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
                        <Stack direction={'row'} spacing={6}>
                            <SocialButton label={'Twitter'} href={'#'}>
                            <FaTwitter />
                            </SocialButton>
                            <SocialButton label={'YouTube'} href={'#'}>
                            <FaYoutube />
                            </SocialButton>
                            <SocialButton label={'Instagram'} href={'#'}>
                            <FaInstagram />
                            </SocialButton>
                        </Stack>
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