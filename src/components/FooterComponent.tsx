import { useMediaQuery } from '@mantine/hooks';
import { Group, Image, Box } from '@mantine/core';
import classes from '../css/Footer.module.css';

import dark_blue_bright_red from '../assets/dark_blue_bright_red.png';
import blumen_ende_home from '../assets/blumen_ende_home.png';

export function FooterComponent() {
    const isTablet = useMediaQuery('(max-width: 992px)');
    const isDesktop = useMediaQuery('(max-width: 1200px)');

  return (
    
    <div className={classes.footer} style={{
        position: 'sticky',
        width: '100%',
    }}>
        <Group display={"flex"} justify={"center"} align={"center"} className={classes.inner}>
            <Image src={dark_blue_bright_red} alt="Logo" w={120}/>
        </Group>
        <Box style={{
            position: 'relative',
        }}>
            <Image src={blumen_ende_home} alt="blumen_ende_home" w={isTablet ? 180 : isDesktop ? 300 : 450} style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                transform: 'scaleX(-1)',
            }}/>
        </Box>
    </div>
  );
}