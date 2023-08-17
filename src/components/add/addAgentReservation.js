import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Button, Row, Form } from 'react-bootstrap';
import Select from 'react-select';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { DateTimeField } from '@mui/x-date-pickers';
import { useSelector } from 'react-redux'


export default function AddAgentReservation() {
    const token = useSelector(state => state.token.value)

    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [car, setCar] = useState()
    const [sectionOptions, setSectionOptions] = useState([])
    const [carOptions, setCarOptions] = useState([])
    const [reservationDate, setReservationDate] = useState()
    const [passengerName, setPassengerName] = useState('')
    const [passengerPhone, setPassengerPhone] = useState('')

    useEffect(() => {
        getSections()
        getCars()
    }, [])

    const createReservation = () => {
        axios.post(
            'http://localhost:5000/api/reservation',
            {
                fromId: from.value,
                toId: to.value,
                car: car.value,
                reservationDate: new Date(reservationDate['$d']),
                passengerName,
                passengerPhone
            },
            {
                headers: {
                    'Authorization': token
                }
            }
        ).then(response => {
            if (response.status === 201) {
                console.log(response.data);
            }
            setFrom('')
            setTo('')
            setReservationDate('')
            setPassengerName('')
            setPassengerPhone('')
        }).catch(error => {
            console.log(error)
        })
    }

    const getSections = () => {
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
    }

    const getCars = () => {
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
    }

    const customStyles = {
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: state.isSelected ? "#212529" : "#fff",
            backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
        })
    };

    return (
        <div className="App">
            <Container fluid>
                <h2 style={{ color: 'white', paddingTop: 10, paddingBottom: 10 }}>Yeni Rezervasyon Ekle</h2>

                <Row style={{ marginTop: 20 }}>
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
                            <Form.Label>Nereden</Form.Label>
                            <Select options={sectionOptions} value={from || ''} onChange={(choice) => {
                                setFrom(choice)
                            }} color='black'
                                styles={customStyles}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nereye</Form.Label>
                            <Select options={sectionOptions} value={to || ''} onChange={(choice) => {
                                setTo(choice)
                            }} color='black'
                                styles={customStyles}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Araç</Form.Label>
                            <Select options={carOptions} value={car || ''} onChange={(choice) => {
                                setCar(choice)
                            }} color='black'
                                styles={customStyles}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tarih</Form.Label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoItem>
                                    <DateTimeField
                                        onChange={(newValue) => setReservationDate(newValue)}
                                        ampm={false}
                                        format='DD/MM/YYYY HH:mm'
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'white',
                                            },
                                            label: {
                                                color: 'green'
                                            }
                                        }}
                                    />
                                </DemoItem>
                            </LocalizationProvider>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Yolcu Adı</Form.Label>
                            <Form.Control type="text" placeholder="Yolcu adı" onChange={(e) => setPassengerName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Yolcu iletişim bilgisi</Form.Label>
                            <Form.Control type="text" placeholder="Yolcu iletişim bilgisi" onChange={(e) => setPassengerPhone(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Button variant="success" onClick={createReservation}>Yeni Rezervasyon Oluştur</Button>
                        </Form.Group>
                    </Form>
                </Row>
            </Container>
        </div>
    )
}