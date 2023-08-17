import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Select from 'react-select';

export default function PriceEditModal(props) {
  const [sectionOptions, setSectionOptions] = useState([])
  const [carOptions, setCarOptions] = useState([])
  const [car, setCar] = useState()
  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const [price, setPrice] = useState('')
  
  useEffect(() => {
    axios.get(
      'http://localhost:5000/api/section'
    ).then(response => {
      if (response.status === 200) {
        const sections = []
        for (const section of response.data) {
          sections.push({ value: section.id, label: section.sectionName })
        }
        setSectionOptions(sections)
      }
    }).catch(error => {
      console.log(error);
    })

    axios.get(
      'http://localhost:5000/api/car'
    ).then(response => {
      if (response.status === 200) {
        const cars = []
        for (const car of response.data) {
          cars.push({ value: car.id, label: car.name })
        }
        setCarOptions(cars)
      }
    }).catch(error => {
      console.log(error);
    })

    axios.get(
      `http://localhost:5000/api/price/${props.id}`
    ).then(response => {
      if (response.status === 200) {
        setPrice(response.data.price)
        setFrom({value: response.data.from.id, label: response.data.from.sectionName})
        setTo({value: response.data.to.id, label: response.data.to.sectionName})
        setCar({value: response.data.car.id, label: response.data.car.name})
      }
    }).catch(error => {
      console.log(error);
    })
  }, [props.id])

  const editPrice = (id) => {
    axios.patch(
      `http://localhost:5000/api/price/${props.id}`,
      {
        fromId: from.value,
        toId: to.value,
        carId: car.value,
        price
      }
    ).then(response => {
      if (response.status === 200) {
        props.onHide()
      }
    }).catch(error => {
      console.log(error);
    })
  }

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#212529" : "#fff",
      backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
    })
  };

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
          alignItems: 'center'
        }}>
          <Form.Group className="mb-3">
            <Form.Label>Nereden</Form.Label>
            <Select options={sectionOptions} value={from || ''} onChange={(choice) => setFrom(choice)} color='black'
              styles={customStyles}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nereye</Form.Label>
            <Select options={sectionOptions} value={to || ''} onChange={(choice) => setTo(choice)} color='black'
              styles={customStyles}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Araç</Form.Label>
            <Select options={carOptions} value={car || ''} onChange={(choice) => setCar(choice)} color='black'
              styles={customStyles}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fiyat</Form.Label>
            <Form.Control type="number" placeholder="Fiyat" value={price || ''} onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#282c34' }}>
        <Button variant='secondary' onClick={props.onHide}>Kapat</Button>
        <Button variant='success' onClick={editPrice}>Düzenle</Button>
      </Modal.Footer>
    </Modal>
  )
}