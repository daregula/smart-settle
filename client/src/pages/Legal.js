import React from 'react'
import { Box, Text, Heading, Container, Stack } from '@chakra-ui/react'


export const Legal = () => {

    return (
        <div style={{ flexGrow: "1"}}>
            < LegalContent/>
        </div>
    )
}

export const LegalContent = () => {
    return (
        
        <div style={{flexGrow: "1"}}>
            <div>
                <link
                    href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
                    rel="stylesheet"
                />
            </div>
        <Container maxW={'container.xl'}>
            <Stack
                as={Box}
                textAlign={'center'}
                spacing={{ base: 8, md: 20 }}
                py={{ base: 20, md: 30 }}
            >
            <Heading
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                lineHeight={'110%'}
            >
                Legal <br />
                <Text as={'span'} color={'purple.400'}>
                    Terms
                </Text>
            </Heading>

            <Text  fontWeight={'500'} fontSize={'lg'} mb={2}>
                These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and Smart Settle, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.

                Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of these Legal Terms, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Legal Terms to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Legal Terms by your continued use of the Services after the date such revised Legal Terms are posted.

                All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Services. If you are a minor, you must have your parent or guardian read and agree to these Legal Terms prior to you using the Services.

                We recommend that you print a copy of these Legal Terms for your records.
                </Text>

        </Stack>
    </Container>
    </div>
    )
}