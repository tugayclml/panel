import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import Select from 'react-select';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useLocation } from 'react-router-dom';
import dayjs from "dayjs";
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { hours, minutes } from '../../constants/hoursAndMinutes'

export default function Reservation() {
    const location = useLocation()

    const [reservationAgent, setReservationAgent] = useState()
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [car, setCar] = useState()
    const [price, setPrice] = useState('')
    const [sectionOptions, setSectionOptions] = useState([])
    const [carOptions, setCarOptions] = useState([])
    const [reservationDate, setReservationDate] = useState()
    const [passengerName, setPassengerName] = useState('')
    const [passengerPhone, setPassengerPhone] = useState('')
    const [agents, setAgents] = useState([])
    const [currency, setCurrency] = useState({ value: 'tl', label: 'TL' })
    const [passengerEmail, setPassengerEmail] = useState()
    const [passengerAdultsCount, setPassengerAdultsCount] = useState('')
    const [passengerChildsCount, setPassengerChildsCount] = useState('')
    const [hour, setHour] = useState()
    const [minute, setMinute] = useState()
    const [flightNo, setFlightNo] = useState()
    const [passengerBabyChair, setPassengerBabyChair] = useState()
    const [amplifier, setAmplifier] = useState()
    const [driverNote, setDriverNote] = useState()
    const [operationNote, setOperationNote] = useState()
    const [passengerPay, setPassengerPay] = useState()
    const [passengerPayCurrency, setPassengerPayCurrency] = useState({ value: 'tl', label: 'TL' })

    const currencies = [
        { value: "tl", label: "TL" },
        { value: "eu", label: "EU" },
        { values: "usd", label: "USD" }
    ]

    useEffect(() => {
        getSections()
        getCars()
        getAgents()

        axios.get(
            `http://localhost:5000/api/reservation/${location.state.reservationId}`
        ).then(response => {
            if (response.status === 200) {
                setReservationAgent({ value: response.data.agent.id, label: response.data.agent.name })
                setFrom({ value: response.data.from.id, label: response.data.from.sectionName })
                setTo({ value: response.data.to.id, label: response.data.to.sectionName })
                setCar({ value: response.data.car.id, label: response.data.car.name })
                setPrice(response.data.price)
                setPassengerName(response.data.passengerName)
                setPassengerPhone(response.data.passengerPhone)
                setReservationDate(dayjs(response.data.reservationDate))
                setCurrency({ value: 'tl', label: 'TL' })
                setPassengerAdultsCount(response.data.passengerAdultsCount)
                setPassengerChildsCount(response.data.passengerChildsCount)
                setFlightNo(response.data.flightNo)
                setPassengerBabyChair(response.data.passengerBabyChair)
                setAmplifier(response.data.amplifier)
                setPassengerPay(response.data.passengerPay)
                setDriverNote(response.data.driverNote)
                setOperationNote(response.data.operationNote)
                setPassengerPayCurrency(JSON.parse(response.data.passengerPayCurrency))
                setCurrency(JSON.parse(response.data.currency))
            }
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const edit = () => {
        axios.patch(
            `http://localhost:5000/api/reservation/${location.state.reservationId}`,
            {
                from: from.value,
                to: to.value,
                car: car.value,
                price,
                reservationDate: reservationDate['$d'],
                passengerName,
                passengerPhone,
                passengerEmail,
                passengerAdultsCount,
                passengerChildsCount,
                flightNo,
                passengerBabyChair,
                amplifier,
                passengerPay,
                driverNote,
                operationNote,
                passengerPayCurrency,
                currency
            }
        ).then(response => {
            if (response.status === 200) {
            }
        }).catch(error => {
            console.log(error);
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

    const getAgents = () => {
        axios.get(
            'http://localhost:5000/api/agent'
        ).then(response => {
            for (const agent of response.data) {
                agents.push({ value: agent.id, label: agent.name })
            }
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
                <h2 style={{ color: 'white', paddingTop: 10, paddingBottom: 10 }}>Rezervasyon Güncelle</h2>


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
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Acente</Form.Label>
                                <Select options={agents} value={reservationAgent || ''} onChange={(choice) => {
                                    setReservationAgent(choice)
                                }} color='black'
                                    styles={customStyles}
                                />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nereden</Form.Label>
                                    <Select options={sectionOptions} value={from || ''} onChange={(choice) => {
                                        setFrom(choice)
                                    }} color='black'
                                        styles={customStyles}
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nereye</Form.Label>
                                    <Select options={sectionOptions} value={to || ''} onChange={(choice) => {
                                        setTo(choice)
                                    }} color='black'
                                        styles={customStyles}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Araç</Form.Label>
                                    <Select options={carOptions} value={car || ''} onChange={(choice) => {
                                        setCar(choice)
                                    }} color='black'
                                        styles={customStyles}
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Para Birimi</Form.Label>
                                    <Select options={currencies} value={currency || ''} onChange={(choice) => {
                                        setPassengerPayCurrency(choice)
                                    }} color='black'
                                        styles={customStyles}
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Fiyat</Form.Label>
                                    <Form.Control type="text" placeholder="Fiyat" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Yolcu iletişim bilgisi</Form.Label>
                                    <Form.Control type="text" value={passengerPhone} placeholder="Yolcu iletişim bilgisi" onChange={(e) => setPassengerPhone(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Yolcu e-posta</Form.Label>
                                    <Form.Control type="text" value={passengerEmail} placeholder="Yolcu e-posta" onChange={(e) => setPassengerEmail(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Yetişkin sayısı</Form.Label>
                                    <Form.Control type="number" value={passengerAdultsCount} placeholder="Yetişkin sayısı" onChange={(e) => setPassengerAdultsCount(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Çocuk sayısı</Form.Label>
                                    <Form.Control type="number" value={passengerChildsCount} placeholder="Çocuk sayısı" onChange={(e) => setPassengerChildsCount(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <h5>* Operasyon not bölümünü <b>sadece</b> bizim personelimiz tarafında görülebilir. Eğer şöförün görmesini istediğiniz bir notunuz var ise lütfen Şöför not bölümünü kullanınız.</h5>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tarih</Form.Label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoItem>
                                            <DesktopDatePicker
                                                onChange={(newValue) => setReservationDate(newValue)}
                                                format='DD/MM/YYYY'
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
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Saat</Form.Label>
                                    <Select options={hours} onChange={(choice) => {
                                        setHour(choice)
                                    }} color='black'
                                        styles={customStyles}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Dakika</Form.Label>
                                    <Select options={minutes} onChange={(choice) => {
                                        setMinute(choice)
                                    }} color='black'
                                        styles={customStyles}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Uçuş no</Form.Label>
                                <Form.Control type="text" value={flightNo} placeholder="Uçuş no" onChange={(e) => setFlightNo(e.target.value)} />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Bebek Koltuğu</Form.Label>
                                    <Form.Control type="number" value={passengerBabyChair} placeholder="Bebek koltuğu" onChange={(e) => setPassengerBabyChair(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Yükseltici</Form.Label>
                                    <Form.Control type="number" value={amplifier} placeholder="Yükseltici" onChange={(e) => setAmplifier(e.target.value)} />
                                </Form.Group>
                            </Col>

                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Müşteri Ödemesi</Form.Label>
                                    <Form.Control type="number" value={passengerPay} placeholder="Müşteri Ödemesi" onChange={(e) => setPassengerPay(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Para Birimi</Form.Label>
                                    <Select options={currencies} value={passengerPayCurrency || ''} onChange={(choice) => {
                                        setPassengerPayCurrency(choice)
                                    }} color='black'
                                        styles={customStyles}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Yolcu Adı</Form.Label>
                                <Form.Control type="text" value={passengerName} placeholder="Yolcu adı" onChange={(e) => setPassengerName(e.target.value)} />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Şöför Notu</Form.Label>
                                <Form.Control as="textarea" value={driverNote} placeholder="Şöför Notu" onChange={(e) => setDriverNote(e.target.value)} />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Operasyon Notu</Form.Label>
                                <Form.Control as="textarea" value={operationNote} placeholder="Operasyon Notu" onChange={(e) => setOperationNote(e.target.value)} />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3">
                            <Button variant="success" onClick={edit}>Rezervasyon Güncelle</Button>
                        </Form.Group>
                    </Form>
                </Row>
            </Container>
        </div>
    )
}