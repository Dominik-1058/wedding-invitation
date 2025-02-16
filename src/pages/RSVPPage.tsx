import { useMediaQuery } from '@mantine/hooks';
import { Loader } from "@mantine/core";
import { useForm } from '@mantine/form';
import { Container, Button, Group, Select, Flex, Text, Box,Checkbox, TextInput, Textarea, Stack, Radio, Alert } from '@mantine/core';
import { useEffect, useState } from 'react';

import { IconX } from '@tabler/icons-react';
import { Dropbox } from 'dropbox';

const dbx = new Dropbox({ accessToken: import.meta.env.VITE_DROPBOX_ACCESS_TOKEN });

type Person = {
    name: string;
    type: 'adult' | 'child' | 'baby';
};

interface Content {
    event_id: number;
    firstname: string;
    lastname: string;
    note: string;
    shuttle: string[];
    events: string[];
    people: Person[];
    attending: 'no' | 'yes';
}

type Responses = Record<string, Content>;

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

async function updateFile(fileName: string, rsvp: Responses) {
    try {
        const response = await dbx.filesDownload({ path: `/your-folder-name/${fileName}` });

        if (response.result.fileBlob) {
            const fileContent = await response.result.fileBlob.text();
            let jsonData: Responses = JSON.parse(fileContent);

            jsonData = { ...jsonData, ...rsvp };

            const updatedContent = JSON.stringify(jsonData, null, 2);

            await dbx.filesUpload({
                path: `/your-folder-name/${fileName}`,
                contents: updatedContent,
                mode: { ".tag": "overwrite" },
            });

            console.log("File updated successfully.");
        }
    } catch (error) {
        console.error("Error updating file:", error);
    }
}

const RSVPPage = () => {
    const isMobile = useMediaQuery('(max-width: 576px)');
    const fileName = import.meta.env.VITE_DROPBOX_RESPONSES;
    const [responses, setJsonData] = useState<any>(null);
    const eventData = getCookie('event');
    const [loading, setLoading] = useState(true); 

    const fetchRSVP = (responses: Responses) => {
        const cookie = getCookie('event');
        if (!cookie) {
            setLoading(false);
            return;
        }

        const key = cookie.firstname + cookie.lastname;
        if (responses[key]) {
            const response = responses[key];

            form.setValues({
                event_id: response.event_id,
                firstname: response.firstname,
                lastname: response.lastname,
                note: response.note || "",
                shuttle: response.shuttle || [],
                events: response.events || [],
                people: response.people || [],
                attending: response.attending || "no",
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        const getResponses = async (fileName: string) => {
            try {
                const response = await dbx.filesDownload({ path: `/your-folder-name/${fileName}`});
    
                if (response.result.fileBlob) {
                    const fileBlob = response.result.fileBlob;
                    console.log(fileBlob);
                    const fileContent = await fileBlob.text();
                    console.log(fileContent);
                    const jsonData = JSON.parse(fileContent);
                    console.log(jsonData);
                    setJsonData(jsonData);
                }
            } catch (error) {
                console.log(error);
            } //finally {
            //     setLoading(false); // Stop loading when fetch is complete
            // } 
        }
    
        getResponses(fileName);
        console.log(responses);
    }, []);

    useEffect(() => {
        if (responses) {
            fetchRSVP(responses);
        }
    }, [responses]);

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
        const fetchRSVP = async (responses: Responses) => {
            const cookie = getCookie('event');
            let response = null;
            if (!cookie) {
                return;
            }
            const key = cookie.firstname + cookie.lastname;
            if (responses && key && key in responses) {
                response = responses[key]
            }

            // const rsvp = await checkRSVPExists(1, cookie.id);
            if (response) {
                form.setValues({
                    event_id: response.event_id,
                    firstname: response.firstname,
                    lastname: response.lastname,
                    note: response.note || "",
                    shuttle: response.shuttle || [],
                    events: response.events || [],
                    people: response.people || [],
                    attending: response.attending || "no",
                });
            }
        };

        fetchRSVP(responses);
    }, []);

    const submitForm = async(values: Record<string, any>) => {
        const cookie = getCookie('event');
        if (!cookie) {
            return;
        }
        
        const key = cookie.firstname + cookie.lastname;
        console.log(values);

        const updatedResponses = { ...responses, [key]: values };
        setJsonData(updatedResponses);
        await updateFile(fileName, updatedResponses);
    };

    return (
        <Container size={'xs'} style={{
            paddingTop: '2rem',
        }}>
            { !loading ? (
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
            ) : (
            <Flex justify="center" align="center" style={{ height: "50vh" }}>
                <Loader size="xl" color="gray" /> {/* Show loader while loading */}
            </Flex>
            )}
        </Container>
    );
};

export default RSVPPage;