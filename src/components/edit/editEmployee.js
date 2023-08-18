import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useLocation } from "react-router-dom"

export default function EditEmployee() {
    const location = useLocation()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [nationality, setNationality] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [identificationNumber, setIdentificationNumber] = useState('')

    const getEmployee = useCallback(() => {
        axios.get(
            process.env.REACT_APP_API_URL + `/api/employee/${location.state.employeeId}`
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
            console.log(error);
        })
    }, [])

    useEffect(() => {
        getEmployee()
    }, [getEmployee])

    const editEmployee = () => {
        axios.patch(
            process.env.REACT_APP_API_URL + `/api/employee/${location.state.employeeId}`,
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
            }
        })
    }

    

    return (
        <div className="App">
            <h2 style={{ color: 'white', paddingTop: 10, paddingBottom: 10 }}>Şöför Güncelle</h2>
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
                    <Button variant="success" onClick={editEmployee}>Şöför Güncelle</Button>
                </Form.Group>
            </Form>
        </div>
    )
}