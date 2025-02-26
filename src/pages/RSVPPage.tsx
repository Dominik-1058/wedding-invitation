import { useMediaQuery } from '@mantine/hooks';
import { Loader } from "@mantine/core";
import { useForm } from '@mantine/form';
import { Container, Button, Group, Select, Flex, Text, Box,Checkbox, TextInput, Textarea, Stack, Radio, Alert } from '@mantine/core';
import { useEffect, useState, useRef } from 'react';

import { IconX } from '@tabler/icons-react';


const RSVPPage = () => {
    const isMobile = useMediaQuery('(max-width: 576px)');

    return (
        <Container size={'xl'} style={{
            paddingTop: '2rem',
        }}>
            <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSf99zx4tleAIPcK1z93EEinn2SNDF3xXfU7CgfBttru0Pbn_A/viewform?embedded=true" 
                width={isMobile ? "100%" : "568px"}
                height="944"
                style={{
                    border: 'none',
                }}
            >
                Wird geladen…
            </iframe>
        </Container>
    );
};

export default RSVPPage;