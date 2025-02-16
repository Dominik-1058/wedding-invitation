import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { createTheme } from '@mantine/core'
import './App.css'

import '@mantine/core/styles.css';

import { MantineProvider, Box } from '@mantine/core';

import HeaderComponent from './components/HeaderComponent.tsx';
import { FooterComponent } from './components/FooterComponent.tsx';
import ScrollIndicator from './components/ScrollIndicatorComponent.tsx';
import HomePage from './pages/HomePage.tsx';
import ImagePage from './pages/ImagePage.tsx';
import InfoPage from './pages/InfoPage.tsx';
import FirstVisitPage from './pages/FirstVisitPage.tsx';
import RSVPPage from './pages/RSVPPage.tsx';

function deleteCookie(name: string) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//deleteCookie("event");

function getCookie(name: string): { firstname: string, lastname: string, event_code: string } | null {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    let [key, value] = cookie.split("=");
    if (key === name) {
      const decodedValue = decodeURIComponent(value);
      try {
        return JSON.parse(decodedValue); // Convert the cookie value back to an object
      } catch (e) {
        console.error("Error parsing cookie value:", e);
        return null;
      }
    }
  }
  return null;
}

function App() {
  const navigate = useNavigate();

  const theme = createTheme({
    fontFamily: "Raleway, sans-serif",
    fontSizes: {
      xs: "9pt",
      sm: "12pt",
      md: "13pt",
      lg: "15pt",
      xl: "17pt",
    },
  });

  useEffect(() => {
      const eventCookie = getCookie('event');
      
      if (!eventCookie) {
          navigate('/first-visit');  // Redirect to a first visit page
      }
  }, []);

  return (
    <MantineProvider theme={theme}>
      <HeaderComponent />
      <Box className='content'>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/images" element={<ImagePage />} />
            {/* <Route path="/messages" element={<MessagePage />} /> */}
            <Route path="/rsvp" element={<RSVPPage />} />
            <Route path="first-visit" element={<FirstVisitPage />} />
            <Route path="infos" element={<InfoPage />} />
        </Routes>
        <ScrollIndicator />
      </Box>
      <FooterComponent />
    </MantineProvider>
  )
}

export default App
