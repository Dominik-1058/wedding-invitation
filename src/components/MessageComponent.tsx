
import React, { useState, FormEvent } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { TextInput, Textarea, Button, Container, Title, Group, Box, rem, Flex } from '@mantine/core';

interface FormState {
    name: string;
    message: string;
    submitted: boolean;
  }

const MessageComponent: React.FC = () => {
    const isMobile = useMediaQuery('(max-width: 576px)');
    const isTablet = useMediaQuery('(max-width: 992px)');
    const isDesktop = useMediaQuery('(max-width: 1200px)');

    // Use type annotations for the state
    const [formState, setFormState] = useState<FormState>({
      name: '',
      message: '',
      submitted: false,
    });
  
    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    // Handle form submission
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      // Process the form submission (e.g., save the message or send it to a server)
      setFormState((prevState) => ({
        ...prevState,
        submitted: true,
      }));
    };
  
    return (
        <Box style={{
              display: 'flex',
              justifyContent: 'center',
              maxWidth: 'calc(1280px + 2rem)',
              minWidth: isMobile ? 'calc(600px + 2rem)' : '',
        }}>
            <Box style={{
                height: '100%',
                border: '1px solid var(--mantine-color-gray-5)',
                borderRadius: rem(8),
                padding: rem(20),
                margin: rem(20),
                width: '100%',
            }}>
                {formState.submitted ? (
                <div style={{ textAlign: 'center' }}>
                    <h3>Danke für deine Nachricht!</h3>
                </div>
                ) : (
                <form onSubmit={handleSubmit}>
                    <Textarea
                    label="Deine Nachricht"
                    placeholder="Ihr seid die Besten!"
                    value={formState.message}
                    onChange={handleChange}
                    name="message"
                    required
                    minRows={4}
                    mb="lg"
                    w={"100%"}
                    labelProps={{ style: { textAlign: 'left', width: '100%' } }}
                    />
                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Absenden</Button>
                    </Group>
                </form>
                )}
            </Box>
        </Box>
    );
};

export default MessageComponent;