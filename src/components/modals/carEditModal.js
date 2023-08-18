import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function CarEditModal(props) {
  const [name, setName] = useState('')
  const [model, setModel] = useState('')
  const [numberOfPeople, setNumberOfPeople] = useState('')
  const [make, setMake] = useState('')
  const [year, setYear] = useState('')
  const [plate, setPlate] = useState('')
  const [driver, setDriver] = useState('')

  useEffect(() => {
    axios.get(
      process.env.REACT_APP_API_URL + `/api/car/${props.id}`
    ).then(response => {
      if (response.status === 200) {
        setName(response.data.name)
        setModel(response.data.model)
        setNumberOfPeople(response.data.numberOfPeople)
        setMake(response.data.make)
        setYear(response.data.year)
        setPlate(response.data.plate)
        setDriver(response.data.driver)
      }
    }).catch(error => {
      console.log(error)
    })
  }, [props.id])

  const edit = () => {
    axios.patch(
      process.env.REACT_APP_API_URL + `/api/car/${props.id}`,
      {
        name,
        model,
        numberOfPeople,
        make,
        year,
        plate,
        driver
      }
    ).then(response => {
      // Make alert here
      props.onHide()
    }).catch(error => {
      console.log(error)
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
          Aracı Düzenle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#282c34' }}>
        <Form style={{
          color: 'white',
          textAlign: 'start',
          alignItems: 'center',
        }}>
          <Form.Group className="mb-3">
            <Form.Label>Araç ismi</Form.Label>
            <Form.Control type="text" placeholder="Araç ismi" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Model</Form.Label>
            <Form.Control type="text" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Marka</Form.Label>
            <Form.Control type="text" placeholder="Marka" onChange={(e) => setMake(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Plaka</Form.Label>
            <Form.Control type="text" placeholder="Plaka" onChange={(e) => setPlate(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Yıl</Form.Label>
            <Form.Control type="text" placeholder="Yıl" onChange={(e) => setYear(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Şöför</Form.Label>
            <Form.Control type="text" placeholder="Şöför" onChange={(e) => setDriver(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Kaç kişilik</Form.Label>
            <Form.Control type="text" placeholder="Kaç kişilik" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} />
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