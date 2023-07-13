import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
    return (
        <NotFound />
    )
}

export default function NotFound() {
    return (
        <Box textAlign="center" py={10} px={6} style={{ flexGrow: "1"}}>
            <Heading
                display="inline-block"
                as="h2"
                size="2xl"
                bgGradient="linear(to-r, purple.400, purple.600)"
                backgroundClip="text">
                404
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
                Page Not Found
            </Text>
            <Text color={'gray.500'} mb={6}>
                The page you're looking for does not seem to exist
            </Text>
            <Link to={'/'}> 
            <Button bg={'purple.400'} color={'white'} _hover={{bg: 'purple.300'}} > Go Home </Button>
            </Link>
        </Box>
    );
}