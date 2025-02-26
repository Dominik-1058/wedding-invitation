import { Container, Grid, Flex, Box, Group, Title, Text, Avatar, Image } from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';

import styles from '../css/App.module.css';

import blumen_beim_dresscode from '../assets/blumen_beim_dresscode.png';

const DresscodePage = () => {
    const isMobile = useMediaQuery('(max-width: 576px)');
    const isTablet = useMediaQuery('(max-width: 992px)');
    const isDesktop = useMediaQuery('(max-width: 1200px)');

    return (
        <>
            <Image src={blumen_beim_dresscode} alt="Blumen" w={isTablet ? 250 : isDesktop ? 500 : 750} />
            <Container 
                size={'xs'}
                >
                <Grid style={{
                    marginTop: isTablet ? "1rem" : "-6rem"
                }}>
                    <Grid.Col span={2}>
                        <Flex direction={"column"} justify={"center"} align={"center"}
                            style={{ height: "100%" }}
                        >
                            <Text className={styles.special}
                                style={{
                                    transform: "rotate(-90deg) translateX(40%)",
                                    fontSize: "3rem",
                                }}>
                                Dresscode
                            </Text>
                        </Flex>
                    </Grid.Col>
                    <Grid.Col span={10}>
                        <Flex
                            direction={"column"}
                            gap={{
                                xs: "xs",
                                md: "xl",
                            }}                
                            style={{ textAlign: "left" }}
                        >
                            <Box pb={"md"}>
                                <Title order={6}>Thema</Title>
                                <Text size="11pt">
                                    Wein, Liebe und Farben des Spätsommers
                                </Text>
                                <Group justify="center"
                                    gap={ isMobile ? "xs" : "xl"}
                                    pt={"sm"}
                                    pb={"sm"}
                                >
                                    <Avatar className={styles.theme_one} radius={"xl"} size={ isMobile ? "md" : "2.8rem"}> </Avatar>
                                    <Avatar className={styles.theme_two} radius={"xl"} size={ isMobile ? "md" : "2.8rem"}> </Avatar>
                                    <Avatar className={styles.theme_five} radius={"xl"} size={ isMobile ? "md" : "2.8rem"}> </Avatar>
                                    <Avatar className={styles.theme_three} radius={"xl"} size={ isMobile ? "md" : "2.8rem"}> </Avatar>
                                    <Avatar className={styles.theme_four} radius={"xl"} size={ isMobile ? "md" : "2.8rem"}> </Avatar>
                                </Group>
                            </Box>
                            <Box pb={"md"}>
                                <Title order={6}>Damen</Title>
                                <Text size="11pt">
                                Cocktail Chic, bitte keine weißen Kleider - die Farbe ist für die Braut reserviert. 

                                </Text>
                            </Box>
                            <Box>
                                <Title order={6}>Herren</Title>
                                <Text size="11pt">
                                    Schwarze, graue oder blaue Anzüge sind selbstverständlich eine sichere Wahl. Wer aber mutig ist, darf sich gerne etwas aus der Fabpalette wagen!
                                </Text>
                            
                                <Text size="11pt">
                                    Seid kreativ und bleibt innerhalb diser kleinen Style-Guide-Grenzen - dann sehen wir alle auf den Fotos fantastisch aus!
                                </Text>
                            </Box>
                        </Flex>
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    );
};

export default DresscodePage;