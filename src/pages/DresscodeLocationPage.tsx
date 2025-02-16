import { useState, useEffect } from 'react'
import { Container, Box, Modal } from '@mantine/core'

import styles from '../css/App.module.css'

import LocationPage from './LocationPage.tsx';
import DresscodePage from './DresscodePage.tsx';

const DresscodeLocationPage = () => {
    return (
        <Box className={styles.section}>
            <DresscodePage />
            <LocationPage />
        </Box>
    );
};

export default DresscodeLocationPage;