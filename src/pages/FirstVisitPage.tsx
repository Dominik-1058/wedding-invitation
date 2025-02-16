import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Text, Flex, TextInput, Group, Button } from '@mantine/core'
import { useForm } from '@mantine/form';

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

function setCookie(name: string, values: { firstname: string, lastname: string, event_code: string }, daysToExpire: number = 7, path: string = "/") {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + daysToExpire * 24 * 60 * 60 * 1000); // Set expiration time

    // Convert the values to JSON string
    const cookieValue = encodeURIComponent(JSON.stringify(values)) + 
                        "; expires=" + expirationDate.toUTCString() + 
                        "; path=" + path;

    // Set the cookie in the document
    document.cookie = name + "=" + cookieValue;
}

async function checkPersonExists(firstname: string, lastname: string): Promise<any> {
    const url = new URL('http://127.0.0.1:8000/api/persons/exists');
    url.searchParams.append('firstname', firstname);
    url.searchParams.append('lastname', lastname);

    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            const person = await response.json();
            return person;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error checking person exists:", error);
        return null;
    }
}

async function createPerson(firstname: string, lastname: string): Promise<any> {
    const url = 'http://127.0.0.1:8000/api/persons/';
    const payload = { firstname, lastname };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const person = await response.json();
            return person;
        } else {
            console.error("Failed to create person:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error creating person:", error);
        return null;
    }
}


const FirstVisitPage = () => {
    const navigate = useNavigate();
    const eventCookie = getCookie('event');  // Assuming you have a function to get cookies

    useEffect(() => {
        // Block navigation away if event cookie is not set
        if (!eventCookie) {
            window.onbeforeunload = () => {
            return "You need to complete the first visit before leaving this page!";
          };
        } else {
          window.onbeforeunload = null; // Allow navigation after setting the cookie
        }
    
        // Cleanup the event listener when the component is unmounted
        return () => {
          window.onbeforeunload = null;
        };
    }, [eventCookie, navigate]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const firstVisitForm = useForm({

        mode: 'controlled',
        initialValues: {
            firstname: '',
            lastname: '',
            event_code: '',
        },
        validate: {
            firstname: (value) =>
                value.length < 2 ? 'Firstname is too short.' : null,
            lastname: (value) =>
                value.length < 2 ? 'Lastname is too short.' : null,
            event_code: (value) =>
                value.length !== 5 ? 'Event codes have a length of 5 digits.' : null
        }
    });

    const submitForm = async(values: Record<string, any>) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/events/code/${values.event_code}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                let person = await checkPersonExists(values.firstname, values.lastname);
                if (!(person)) {
                    person = await createPerson(values.firstname, values.lastname);
                }
                
                var cookie = {id: person.id, firstname: values.firstname, lastname: values.lastname, event_code: values.event_code };
                
                setCookie("event", cookie);
                navigate('/');
            } else {
                setError("Event not found")
            } 
        } catch (error) {
            setError("No event found");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container style={{
            maxWidth: '500px',
            paddingTop: '5rem',
            height: '100vh',
        }}>
            <Text style={{
                textAlign: "left"
            }}>
                Bitte gib deinen Namen und den dir übermittelten Code ein.
            </Text>

            <form onSubmit={firstVisitForm.onSubmit((values) => submitForm(values))} style={{
                marginTop: '2rem'
            }}>
                <Flex direction={{ base: 'column', sm: 'column'}}>
                    <TextInput
                        withAsterisk
                        label="First Name"
                        labelProps={{ style: { textAlign: 'left', width: '100%' } }}
                        placeholder="Calvin"
                        key={firstVisitForm.key('firstname')}
                        {...firstVisitForm.getInputProps('firstname')}
                    />
                    <TextInput
                        withAsterisk
                        label="Last Name"
                        labelProps={{ style: { textAlign: 'left', width: '100%' } }}
                        placeholder="Krakowitsch"
                        key={firstVisitForm.key('lastname')}
                        {...firstVisitForm.getInputProps('lastname')}
                    />
                    <TextInput
                        withAsterisk
                        label="Event Code"
                        labelProps={{ style: { textAlign: 'left', width: '100%' } }}
                        placeholder="12345"
                        key={firstVisitForm.key('event_code')}
                        {...firstVisitForm.getInputProps('event_code')}
                    />
                    {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                </Flex>
                <Group justify="flex-end" mt="md">
                    <Button type="submit">Submit</Button>
                </Group> 
            </form>
        </Container>
    );
};

export default FirstVisitPage;
