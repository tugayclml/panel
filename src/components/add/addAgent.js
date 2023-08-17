import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AddAgent() {
  const navigate = useNavigate()
  const [name, setName] = useState()
  const [password, setPassword] = useState()
  const [phoneNumber, setPhoneNumber] = useState()

  const createAgent = () => {
    axios.post(
      'http://localhost:5000/api/agent',
      {
        name,
        password,
        phoneNumber
      }
    ).then(response => {
      if (response.status === 201) {
        navigate('/agents')
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
            <Form.Control type="text" placeholder="Acente ismi" onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Şifre</Form.Label>
            <Form.Control type="text" placeholder="Şifre" onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Acente Telefon Numarası</Form.Label>
            <Form.Control type="text" placeholder="Acente telefon numarası" onChange={(e) => setPhoneNumber(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Button variant="success" onClick={createAgent}>Acente Ekle</Button>
          </Form.Group>
        </Form>
      </Container>
    </div>

  )
}