
import { useState, useEffect } from 'react'
import { Container, Box } from '@mantine/core'
import styles from '../css/App.module.css'
import { FileDrop } from '../components/FileDrop';

const PicturePage = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
      fetch("/api/")  // Proxy will forward to FastAPI backend
          .then((res) => res.json())
          .then((data) => setMessage(data.message));
    }, []);

    return (
        <Box className={styles.section}>
            <Container>
                <FileDrop />
            </Container>
        </Box>
    );
};

export default PicturePage;