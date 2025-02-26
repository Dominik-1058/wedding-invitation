import { Button, Text, Box } from '@mantine/core';

import { useNavigate } from 'react-router-dom';

import styles from '../css/App.module.css';

const RSVPComponent = () => {
    const navigate = useNavigate();

    return (
        <Box pt={"xs"} pb={"5rem"}>
            <Button variant="default" onClick={() => navigate("/rsvp")}
                style={{
                padding: "10px 20px",
                color: "white",
                border: "none",
                borderRadius: "0px",
                cursor: "pointer",
                zIndex: 10
                }}
                className={styles.btn_bg}>
                <Text size='md'>Anmelden</Text>
            </Button>
            <Text style={{ textAlign: 'center' }} pt={"xs"}>
                Rückmeldung bitte bis zum 31.03.2025.
            </Text>
        </Box>
    );
};
  
  export default RSVPComponent;