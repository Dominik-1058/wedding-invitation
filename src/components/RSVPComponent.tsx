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
                <Text size='md'>Antworten</Text>
            </Button>
        </Box>
    );
};
  
  export default RSVPComponent;