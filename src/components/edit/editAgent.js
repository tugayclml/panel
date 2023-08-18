import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function EditAgent() {
    const location = useLocation()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    useEffect(() => {
        console.log(location);
        axios.get(
            process.env.REACT_APP_API_URL + `/api/agent/${location.state.agentId}`
        ).then(response => {
            if (response.status === 200) {
                setName(response.data.name)
                setPassword(response.data.password)
                setPhoneNumber(response.data.phoneNumber)
            }
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const edit = () => {
        axios.patch(
            process.env.REACT_APP_API_URL + `/api/agent/${location.state.agentId}`,
            {
                name,
                password,
                phoneNumber
            }
        ).then(response => {
            if (response.status === 200) {

            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="App">
            <Container>
                <h2 style={{ color: 'white', paddingTop: 10, paddingBottom: 10 }}>Acente Ekle</h2>
                <Form style={{
                    color: 'white',
                    textAlign: 'start',
                    alignItems: 'center',
                    borderRadius: 20,
                    borderColor: 'white',
                    borderStyle: 'solid',
                    padding: 20,
                }}>
                    <Form.Group className="mb-3">
                        <Form.Label>Acente ismi</Form.Label>
                        <Form.Control type="text" value={name} placeholder="Acente ismi" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Şifre</Form.Label>
                        <Form.Control type="text" value={password} placeholder="Şifre" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Acente Telefon Numarası</Form.Label>
                        <Form.Control type="text" value={phoneNumber} placeholder="Acente telefon numarası" onChange={(e) => setPhoneNumber(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Button variant="success" onClick={edit}>Acenteyi Güncelle</Button>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    )
}