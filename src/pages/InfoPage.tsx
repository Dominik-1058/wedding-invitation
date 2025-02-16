import { Container, Box } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';

import SleepoverComponent from '../components/SleepoverComponent';
import PresentsComponent from '../components/PresentsComponent';
import ContactsComponent from '../components/ContactsComponent';

const CouplePage = () => {
    const isDesktop = useMediaQuery('(max-width: 1200px)');

    return (
        <Container size={"sm"}>
            <Box pt={"2rem"} pb={"2rem"} >
                <PresentsComponent />
            </Box>
            <Box pt={"2rem"} >
                <SleepoverComponent />
            </Box>
            <Box pt={"2rem"} >
                <ContactsComponent />
            </Box>
        </Container>
    );
};

export default CouplePage;