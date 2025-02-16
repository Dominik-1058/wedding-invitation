import { Text, Title, Flex, Box, Container, Image, Group, Stack } from "@mantine/core";
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

import trauung from '../assets/trauung.png';
import empfang from '../assets/empfang.png';
import foto from '../assets/foto.png';
import torte from '../assets/torte.png';
import location from '../assets/location.png';
import essen from '../assets/essen.png';
import tanz from '../assets/tanz.png';
import party from '../assets/party.png';
import blumis from '../assets/blumis.png';

import styles from '../css/App.module.css';

type IconKey = 'trauung' | 'empfang' | 'foto' | 'torte' | 'location' | 'essen' | 'tanz' | 'party';

const icons: Record<IconKey, string> = {
    trauung,
    empfang,
    foto,
    torte,
    location,
    essen,
    tanz,
    party,
  };

const timelineData: {icon: IconKey; time: string; title: string}[] = [
    { 
        icon: 'trauung',
        time: '14:00 Uhr',
        title: 'TRAUUNG',
    },
    { 
        icon: 'empfang',
        time: '14:45 Uhr',
        title: 'SEKTEMPFANG',
    },
    {
        icon: 'foto',
        time: '15:30 Uhr',
        title: 'FOTOS',
    },
    {
        icon: 'torte',
        time: '16:30 Uhr',
        title: 'HOCHZEITSTORTE',
    },
    {
        icon: 'location',
        time: '17:15 Uhr',
        title: 'Zur Feier',
    },
    { 
        icon: 'essen',
        time: '18:00 Uhr',
        title: 'ABENDESSEN',
    },
    { 
        icon: 'tanz',
        time: '20:00 Uhr',
        title: 'ERÖFFNUNGSTANZ',
    },
    { 
        icon: 'party',
        time: '21:00 Uhr',
        title: 'PARTY',
    }
];

const ProcessPage = () => {
    const isMobile = useMediaQuery('(max-width: 576px)');
    const isTablet = useMediaQuery('(max-width: 992px)');

    return (
        <Box className={styles.section_timeline} style={{
            position: 'relative',
        }}>        
            <Container size={"xs"}>
                <Flex 
                    justify="center"
                    align="center"
                    direction="column"
                    wrap="wrap"
                >
                    <Title pt={"1.5rem"} pb={"1.5rem"} className={styles.special}>Ablaufplan</Title>
                    {timelineData ? (
                        <Box style={{ width: "100%" }}>
                            <Timeline position="alternate">
                                {timelineData.map((step, index) => (
                                    <TimelineItem key={index} className={index % 2 === 0 ? styles.timeline_item_before : styles.timeline_item_after}>
                                        <TimelineSeparator>
                                            <TimelineDot style={{ 
                                                background: '#FFFFFF', 
                                                height: isMobile ? '25px' : '25px', 
                                                width: isMobile ? '25px' : '25px' }}/>
                                            {index < timelineData.length - 1 && (
                                            <TimelineConnector
                                                style={{ background: '#FFFFFF', height: '70px' }}
                                            />
                                            )}
                                        </TimelineSeparator>
                                        <TimelineContent style={index % 2 === 0 ? { paddingLeft: '0'} : { paddingRight: '0'}}>
                                            <Group align="start" justify={index % 2 === 0 ? "start" : "end"} gap="10">
                                                {index % 2 === 0 ? ( <Text c="#FFFFFF" size="lg">{isMobile ? "- - -" : isTablet ? "- - - -" : "- - - - - - - - - - -"}</Text> ) : null}
                                                
                                                <Stack gap={"5"} align="center" style={{
                                                    transform: index % 2 === 0 ? ( 'translateY(-20%) translateX(-30%)' ) : ( 'translateY(-20%) translateX(30%)' ),
                                                    width: isMobile ? '60px' : '120px',
                                                }}>
                                                    <Image src={icons[step.icon]} alt={step.title} w={isMobile ? 30 : 40}/>
                                                    <Stack gap={"0"} align="center">
                                                        <Text c="#FFFFFF" size="xs">{step.time}</Text>
                                                        <Text c="#FFFFFF" size="10px" fw={700}>{step.title}</Text>
                                                    </Stack>
                                                </Stack>
                                                {index % 2 !== 0 ? ( <Text c="#FFFFFF" size="lg">{isMobile ? "- - -" : isTablet ? "- - - -" : "- - - - - - - - - - -"}</Text> ) : null}
                                            </Group>
                                        </TimelineContent>
                                    </TimelineItem>
                                ))
                            }
                            </Timeline>
                        </Box>
                    ) : (
                        <Text>Loading timeline...</Text>
                    )}
                </Flex>
            </Container>
            <Image src={blumis} alt="blumis" w={isMobile ? 150 : isTablet ? 300 : 450} style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                transform: 'scaleX(-1)',
            }}/>
        </Box>
    );
};

export default ProcessPage;