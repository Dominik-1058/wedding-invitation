import { Container, Box, Stack, Title, Text } from '@mantine/core';

const ContactsComponent = () => {
  return (
    <>
        <Container size="md">
            <Stack>
                <Box>
                    <Title order={4} fw={700} style={{ textAlign: 'left' }}>
                        Du brauchst einen Ansprechpartner?
                    </Title>
                    <Text style={{ textAlign: 'left' }}>
                        Bitte wende dich an die Trauzeugen.
                    </Text>
                </Box>
            </Stack>
        </Container>
    </>
  );
};

export default ContactsComponent;