import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function AddEmployee() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [nationality, setNationality] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [identificationNumber, setIdentificationNumber] = useState('')

    const createEmployee = () => {
        axios.post(
            'http://localhost:5000/api/employee',
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
            if (response.status === 201) {
                setFirstName('')
                setLastName('')
                setGender('')
                setNationality('')
                setAddress('')
                setPhoneNumber('')
                setIdentificationNumber('')
            }
        })
    }

    return (
        <div className="App">
            <h2 style={{ color: 'white', paddingTop: 10, paddingBottom: 10 }}>Şöför Ekleme</h2>
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

                <Form.Group className="mb-3">
                    <Button variant="success" onClick={createEmployee}>Yeni Şöför Ekle</Button>
                </Form.Group>
            </Form>
        </div>
    )
}