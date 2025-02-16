
import { useState, useEffect } from 'react'
import { Container, Box } from '@mantine/core'
import styles from '../css/App.module.css'
import { FileDrop } from '../components/FileDrop';

const PicturePage = () => {
    return (
        <Box className={styles.section}>
            <Container>
                <FileDrop />
            </Container>
        </Box>
    );
};

export default PicturePage;