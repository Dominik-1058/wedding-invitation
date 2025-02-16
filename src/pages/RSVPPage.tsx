import { useMediaQuery } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Container, Button, Group, Select, Flex, Text, Box,Checkbox, TextInput, Textarea, Stack, Radio, Alert } from '@mantine/core';
import { useEffect, useState } from 'react';

import { IconX } from '@tabler/icons-react';

function getCookie(name: string): { id: number, firstname: string, lastname: string, event_code: string } | null {
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

async function checkRSVPExists(event_id: number, person_id: number): Promise<any> {
    const url = 'http://127.0.0.1:8000/api/rsvps/check';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event_id, person_id }),
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.error("Error fetching RSVP data");
    }
}

const RSVPPage = () => {
    const isMobile = useMediaQuery('(max-width: 576px)');
    const eventData = getCookie('event');
    const [alertVisible, setAlertVisible] = useState(false);

    const handleClose = () => {
        setAlertVisible(false);
      };

    type Person = {
        name: string;
        type: 'adult' | 'child' | 'baby';
    };

    type formValues = {
        event_id: number;
        firstname: string;
        lastname: string;
        note: string;
        shuttle: string[];
        events: string[];
        people: Person[];
        attending: 'no' | 'yes';
    };

    const form = useForm<formValues>({
        initialValues: {
            event_id: 1, // please remove this, it's only hardcoded for this event
            firstname: eventData?.firstname || '',
            lastname: eventData?.lastname || '',
            note: '',
            shuttle: [],
            events: [],
            people: [],
            attending: 'no',
        },
        validate: {
            firstname: (value) => value.trim() ? null : 'Vorname ist erforderlich',
            lastname: (value) => value.trim() ? null : 'Nachname ist erforderlich',
            events: (value, values) => values.attending === 'yes' && value.length === 0 
                ? 'Bitte mindestens eine Veranstaltung auswählen' 
                : null,
        },
      });

    const handleAttendingChange = (value: 'yes' | 'no') => {
        form.setFieldValue('attending', value);
        if (value === 'no') {
            form.setValues({
                note: '',
                events: [],
                shuttle: [],
                people: [],
            });
        }
    };

    useEffect(() => {
        if (eventData && (
            form.values.firstname !== eventData.firstname || 
            form.values.lastname !== eventData.lastname)) 
        {
            console.log("Setting form values from eventData:", eventData);
            form.setValues({
                firstname: eventData.firstname,
                lastname: eventData.lastname,
            });
        }
    }, [eventData]);

    useEffect(() => {
        const fetchRSVP = async () => {
            const cookie = getCookie('event');
            if (!cookie) {
                return;
            }
            const rsvp = await checkRSVPExists(1, cookie.id);
            if (rsvp) {
                setAlertVisible(rsvp);
                form.setValues({
                    event_id: rsvp.event_id,
                    firstname: rsvp.firstname,
                    lastname: rsvp.lastname,
                    note: rsvp.note || "",
                    shuttle: rsvp.details?.shuttle || [],
                    events: rsvp.details?.events || [],
                    people: rsvp.details?.people || [],
                    attending: rsvp.attending || "no",
                });
            }
        };

        fetchRSVP();
    }, []);

    const submitForm = async(values: Record<string, any>) => {
        const response = await fetch('http://127.0.0.1:8000/api/rsvps/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        if (response.ok) {
            console.log("Form submitted");
        } else {
            throw response;
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlertVisible(false);
        }, 8000); 
    
        return () => clearTimeout(timer);
    }, []);

    return (
        <Container size={'xs'} style={{
            paddingTop: '2rem',
        }}>
            {alertVisible && (
                <Box style={{ position: 'relative', zIndex: 1000, opacity: alertVisible ? 1 : 0, // Control visibility
                    visibility: alertVisible ? 'visible' : 'hidden', // Prevent interaction after fade-out
                    transition: 'opacity 2s ease-in-out, visibility 0s ease 2s',}}>
                    <Box style={{ position: 'absolute', zIndex: 1000, width: '100%' }}>
                        <Alert color="white" title="Antwort geladen" mb="md" withCloseButton onClose={handleClose} style={{ 
                            padding: '20px',
                            borderRadius: '8px', 
                            background: '#7F909E',
                            opacity: alertVisible ? 1 : 0, // Control visibility
                            visibility: alertVisible ? 'visible' : 'hidden',
                            transition: 'opacity 0.5s ease-in-out',
                        }}>
                            <Text style={{ color: 'white', textAlign: 'left' }}>
                                Wir haben uns erlaubt deine Antwort zu laden. Bitte überprüfe die Details und ändere sie falls nötig.
                            </Text>
                        </Alert>
                    </Box>
                </Box>
            )}

            <form onSubmit={form.onSubmit((values) => submitForm(values))}>
                <Radio.Group
                    label="Dürfen wir mit dir rechnen?"
                    labelProps={{ style: { textAlign: 'left', width: '100%' } }}
                    pb={'sm'}
                    {...form.getInputProps(`attending`)} // Keep the form binding
                    onChange={(event) => {handleAttendingChange(event as 'yes' | 'no')}} // Handle the change event
                    required
                >
                    <Group mt="xs">
                        <Radio value="no" label="Ich nehme nicht teil" />
                        <Radio value="yes" label="Ich nehme teil" />
                    </Group>
                </Radio.Group>

                {form.values.attending === 'yes' && (
                <Stack gap="md" p="sm" mb="md" style={{ border: '1px solid #ccc', borderRadius: 8 }}>
                    <Checkbox.Group
                        label="Ich nehme teil an:" 
                        labelProps={{ style: { textAlign: 'left', width: '100%' } }}
                        {...form.getInputProps('events')}
                        required
                    >
                        <Checkbox value="trauung" label="Trauung (Weingut Cobenzl)" p={'xs'} style={{ textAlign: "left" }}/>
                        <Checkbox value="hochzeitsfeier" label="Hochzeitsfeier (Restaurant Leopold)" p={'xs'}  style={{ textAlign: "left" }}/>
                    </Checkbox.Group>

                    <Checkbox.Group
                        label="Brauche/n einen Shuttle:"
                        labelProps={{ style: { textAlign: 'left', width: '100%' } }}
                        {...form.getInputProps('shuttle')}
                    >
                        <Stack mt="xs">
                            <Checkbox value="wien-trauung" label="Wien U4-Heiligenstadt - Trauung" style={{ textAlign: "left" }}/>
                            <Checkbox value="trauung-feier" label="Trauung - Hochzeitsfeier" style={{ textAlign: "left" }} />
                        </Stack>
                    </Checkbox.Group>
                </Stack>
                )}
                <Stack>
                    {form.values.attending === 'yes' && form.values.people.length > 0 && form.values.people.map((person, index) => (
                        <Box key={index} p="sm" style={{ border: '1px solid #ccc', borderRadius: 8 }}>
                            <Box style={{ position: 'relative' }}>
                                <Button color="#C05E2F" size="xs" onClick={() => form.removeListItem('people', index)} style={{ position: 'absolute', right: 0, top: 0 }}>
                                    <IconX size={15} />
                                </Button>
                            </Box>
                            <Flex direction={isMobile ? 'column' : 'row'} gap="md" justify="start" pt={"sm"}>
                                <Select
                                    label="Alter"
                                    labelProps={{ style: { textAlign: 'left', width: '100%' } }}
                                    data={[
                                        { value: 'adult', label: 'Erwachsener 12+' },
                                        { value: 'child', label: 'Kind 7-12' },
                                        { value: 'baby', label: 'Kleinkind 0-6' }
                                    ]}
                                    {...form.getInputProps(`people.${index}.type`)}
                                    required
                                />

                                <TextInput
                                    label={`Name`}
                                    labelProps={{ style: { textAlign: 'left', width: '100%' } }}
                                    placeholder="Name eingeben"
                                    {...form.getInputProps(`people.${index}.name`)}
                                    
                                    required
                                />
                            </Flex>
                        </Box>
                    ))}
                {form.values.attending === 'yes' && (
                    <>
                <Text mt="md" style={{ textAlign: 'left' }}>
                    Wollen Sie eine weitere Person hinzufügen? klicken Sie auf den Button "Person hinzufügen"
                </Text>
                <Button
                    onClick={() => {
                        if (form.values.people.length < 5) {
                            form.insertListItem('people', { name: '', type: 'adult' });
                        }
                    }}
                    disabled={form.values.people.length >= 5}
                    style={{ alignSelf: 'flex-start', background: '#7F909E', color: 'white' }}
                >
                    Person hinzufügen
                </Button>
                </>
                )}
                </Stack>

                <Textarea label="Allergene oder sonstige Anmerkungen" labelProps={{ style: { textAlign: 'left', width: '100%' } }}
                            {...form.getInputProps('note')} pt={"sm"} />

                <Group justify="flex-end" mt="md">
                    <Button type="submit" bg={"#7F909E"}>Submit</Button>
                </Group>
            </form>
        </Container>
    );
};

export default RSVPPage;