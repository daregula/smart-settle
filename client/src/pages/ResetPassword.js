import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'

export const ResetPassword = () => {
    return (
        <Reset />
    )
}

export default function Reset() {


    return (
        <Box textAlign="center" py={10} px={6}>
        <Heading
            display="inline-block"
            as="h2"
            size="2xl"
            bgGradient="linear(to-r, purple.400, purple.600)"
            backgroundClip="text">
            ResetPassword
        </Heading>

        <Link to={'/'}> 
        <Button bg={'purple.400'} color={'white'} _hover={{bg: 'purple.300'}} > Go Home </Button>
        </Link>
        </Box>
    );
}