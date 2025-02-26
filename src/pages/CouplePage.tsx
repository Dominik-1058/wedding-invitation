
import { useState, useEffect } from 'react'
import { Container, Box, Image, Title, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';

import styles from '../css/App.module.css'

import ICalenderButton from '../components/ICalenderButton';
import RSVPComponent from '../components/RSVPComponent';

import couple from '../assets/couple.jpeg';
import couple2 from '../assets/couple2.jpeg';
import couple3 from '../assets/couple3.jpeg';
import second from '../assets/second.jpeg';
import blumen_unterhalb from '../assets/blumen_unterhalb.png';
import blumen_ende_home from '../assets/blumen_ende_home.png';

const CouplePage = () => {
    const isMobile = useMediaQuery('(max-width: 576px)');

    return (
        <Box className={styles.section}style={{
            position: 'relative',
        }}>
            <Image src={couple3} alt="couple" fit="cover" style={{
                maxHeight: "50vh",
            }} />
            <Image src={blumen_unterhalb} alt="blumen_unterhalb" w={300}/>
            <Container>
                <Title className={styles.special}>Iris & Calvin</Title>
                <Text size="xl">06 / 09 / 2025</Text>
                <RSVPComponent />
            </Container>
            <Image src={blumen_ende_home} alt="blumen_ende_home" w={isMobile ? 200 : 300} style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
            }}/>
        </Box>
    );
};

export default CouplePage;