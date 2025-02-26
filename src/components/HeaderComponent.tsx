import { useState, useEffect } from 'react';
import { motion } from "motion/react"

import { Burger, Container, Group, Drawer, Text, Image, Stack } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import classes from '../css/Header.module.css';

import dark_blue_bright_red from '../assets/dark_blue_bright_red.png';
import blumen_oberhalb from '../assets/blumen_oberhalb.png';

const links = [
  { link: '/', label: 'Übersicht' },
//   { link: '/images', label: 'Fotos' },
//   { link: '/messages', label: 'Nachrichten' },
//   { link: '/rsvp', label: 'RSVP' },
  { link: '/infos', label: 'Infos' },
];

const HeaderComponent = () => {
    const location = useLocation();
    const showHeader = location.pathname !== '/first-visit';
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);

    const items = links.map((link) => (
        <Link
            key={link.link}
            to={link.link}
            className={classes.link}
            data-active={active === link.link || undefined}
            onClick={() => {
                toggle();
            }}
        >
            {link.label}
        </Link>
      ));

    useEffect(() => {
        setActive(location.pathname);
    }, [location.pathname]);

    return (
        <>
            <header className={classes.header}>
                <Container size="md" className={classes.inner}>
                    {showHeader && (
                        <motion.div animate={{
                            scale: [1, 1.2, 1],
                            transition: { duration: 1, repeat: Infinity, repeatType: "loop", repeatDelay: 4 }
                          }}>
                            <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="md" />
                          </motion.div>
                    )}
                    <Group gap={0} visibleFrom="md" style={{ position: 'absolute', left: 25, top: 25 }}>
                      {showHeader && items}
                    </Group>
                    <Text 
                        className={classes.logo} 
                        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
                    >
                        <Image src={dark_blue_bright_red} alt="Logo" style={{
                            maxHeight: '60px',
                            width: 'auto',
                        }}/>
                    </Text>
            
                    <Image src={blumen_oberhalb} alt="Logo" w={100}
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        zIndex: 100,
                    }}/>
                </Container>

            </header>

            {showHeader && (
                <Drawer
                    opened={opened}
                    onClose={toggle}
                    size="100%"
                    padding="md"
                    title={<Image src={dark_blue_bright_red} alt="Logo" style={{
                        maxHeight: '60px',
                        width: 'auto',
                    }} />}
                    hiddenFrom="md"
                    zIndex={1000000}
                >
                    <Stack gap="md">
                    {items}
                    </Stack>
                </Drawer>
            )}
        </>
      );
}

export default HeaderComponent;