import { useState } from 'react';
import '../App.css';
import { Container, Form, Button, Image, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { updateUser } from '../slices/userSlice'
import { setToken } from '../slices/tokenSlice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = () => {
    axios.post(
      'http://localhost:5000/api/login',
      { username, password }
    ).then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('role', response.data.user.role)

        dispatch(updateUser(response.data.user))
        dispatch(setToken(response.data.accessToken))

        response.data.user.role === 'AGENT' ? navigate('/agentReservation') : navigate('/reservations')
      }
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center' }}>
      <header className="App-header">
        <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Image src={require("../images/logo.png")} xs={6} md={4} lg={2} rounded />
          <Form style={{ width: 400 }}>
            <Form.Group className="mb-3">
              <Form.Label>Kullancı Adı</Form.Label>
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
