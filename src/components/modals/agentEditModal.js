import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AgentEditModal(props) {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() => {
    axios.get(
      `http://localhost:5000/api/agent/${props.id}`
    ).then(response => {
      if (response.status === 200) {
        setName(response.data.name)
        setPassword(response.data.password)
        setPhoneNumber(response.data.phoneNumber)
      }
    }).catch(error => {
      console.log(error)
    })
  }, [props.id])

  const edit = (id) => {
    axios.patch(
      `http://localhost:5000/api/agent/${id}`,
      {
        name,
        password,
        phoneNumber
      }
    ).then(response => {
      if (response.status === 200) {
        props.onHide()
      }
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: '#282c34' }}>
        <Modal.Title id="contained-modal-title-vcenter" style={{ color: 'white' }}>
          Acente Düzenle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#282c34' }}>
        <Form style={{
          color: 'white',
          textAlign: 'start',
          alignItems: 'center',
        }}>
          <Form.Group className="mb-3">
            <Form.Label>Acente ismi</Form.Label>
            <Form.Control type="text" placeholder="Acente ismi" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Telefon numarası</Form.Label>
            <Form.Control type="text" placeholder="Telefon numarası" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#282c34' }}>
        <Button variant='secondary' onClick={props.onHide}>Kapat</Button>
        <Button variant='success' onClick={edit}>Düzenle</Button>
      </Modal.Footer>
    </Modal>
  );
}