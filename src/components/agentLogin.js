import { useState } from 'react';
import '../App.css';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AgentLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = () => {
    console.log(username)
    console.log(password)

    axios.post(
      'http://localhost:5000/api/login',
      { username, password }
    ).then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken)
        navigate('/reservations')
      }
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center' }}>
      <header className="App-header">
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Form style={{ width: 400 }}>
            <Form.Group className="mb-3">
              <Form.Label>Acente Kullancı Adı</Form.Label>
              <Form.Control type="text" style={{ textAlign: 'center' }} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Şifre</Form.Label>
              <Form.Control type="password" style={{ textAlign: 'center' }} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Button variant="secondary" style={{ width: 400 }} onClick={login}>Giriş Yap</Button>{' '}
            </Form.Group>
          </Form>
        </Container>
      </header>
    </div>
  )
}
