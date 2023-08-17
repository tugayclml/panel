import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function EmployeeEditModal(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [nationality, setNationality] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [identificationNumber, setIdentificationNumber] = useState('')

    useEffect(() => {
        axios.get(
            `http://localhost:5000/api/employee/${props.id}`
        ).then(response => {
            if (response.status === 200) {
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setGender(response.data.gender)
                setNationality(response.data.nationality)
                setAddress(response.data.address)
                setPhoneNumber(response.data.phoneNumber)
                setIdentificationNumber(response.data.identificationNumber)
            }
        }).catch(error => {
            console.log(error)
        })
    }, [props.id])

    const edit = () => {
        axios.patch(
            `http://localhost:5000/api/employee/${props.id}`,
            {
                firstName,
                lastName,
                gender,
                nationality,
                address,
                phoneNumber,
                identificationNumber
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
                        <Form.Label>Ad</Form.Label>
                        <Form.Control type="text" value={firstName} placeholder="Ad" onChange={(e) => setFirstName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Soyad</Form.Label>
                        <Form.Control type="text" value={lastName} placeholder="Soyad" onChange={(e) => setLastName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cinsiyet</Form.Label>
                        <Form.Control type="text" value={gender} placeholder="Cinsiyet" onChange={(e) => setGender(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Uyruk</Form.Label>
                        <Form.Control type="text" value={nationality} placeholder="Uyruk" onChange={(e) => setNationality(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Adres</Form.Label>
                        <Form.Control type="text" value={address} placeholder="Adres" onChange={(e) => setAddress(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>İletişim</Form.Label>
                        <Form.Control type="text" value={phoneNumber} placeholder="İletişim" onChange={(e) => setPhoneNumber(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>TC Kimlik No</Form.Label>
                        <Form.Control type="text" value={identificationNumber} placeholder="TC Kimlik No" onChange={(e) => setIdentificationNumber(e.target.value)} />
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