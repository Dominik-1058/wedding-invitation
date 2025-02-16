import { Box, Image, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';

import { FileDrop } from '../components/FileDrop';
import blumen_unterhalb from '../assets/blumen_unterhalb.png';

const ImagePage = () => {
    const isMobile = useMediaQuery('(max-width: 576px)');
    const isTablet = useMediaQuery('(max-width: 992px)');
    const isDesktop = useMediaQuery('(max-width: 1200px)');

    return (
        <Box>
            <Box style={{
                minHeight: 'calc(100vh - 80px - 120px - 60px)',
            }}>
                <Image src={blumen_unterhalb} alt="blumen_unterhalb" w={isTablet ? 180 : isDesktop ? 300 : 450}/>
                <Box style={{
                    marginTop: isTablet ? "-1rem" : "-6rem",
                }}>
                    <Title order={isMobile ? 3 : 1}>
                        Bilderablage
                    </Title>
                    <Box style={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <FileDrop />
                    </Box>
                </Box>

            </Box>

        </Box>
        
    )
}

export default ImagePage;