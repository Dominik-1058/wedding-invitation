import { useMediaQuery } from '@mantine/hooks';
import { Loader } from "@mantine/core";
import { useForm } from '@mantine/form';
import { Container, Button, Group, Select, Flex, Text, Box,Checkbox, TextInput, Textarea, Stack, Radio, Alert } from '@mantine/core';
import { useEffect, useState, useRef } from 'react';

import { IconX } from '@tabler/icons-react';


const RSVPPage = () => {
    const isMobile = useMediaQuery('(max-width: 576px)');

    return (
        <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSf99zx4tleAIPcK1z93EEinn2SNDF3xXfU7CgfBttru0Pbn_A/viewform?embedded=true" 
            width={isMobile ? "80%" : "568px"}
            height="944"
            style={{
                border: 'none',
                overflow: 'hidden', /* Prevent the scrollbars from appearing */
                width: '100%', /* Ensure the iframe fits within the container */
                position: 'relative', /* Optional: to better control iframe positioning */
            }}
        >
            Wird geladen…
        </iframe>
    );
};

export default RSVPPage;