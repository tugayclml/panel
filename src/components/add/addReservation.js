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
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useSelector } from 'react-redux'
import { hours, minutes } from '../../constants/hoursAndMinutes'


export default function AddReservation() {
    const token = useSelector(state => state.token.value)

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

        if (from && to && car) {
            axios.post(
                process.env.REACT_APP_API_URL + '/api/reservation/price',
                {
                    fromId: from.value,
                    toId: to.value,
                    carId: car.value
                }
            ).then(response => {
                if (response.data) {
                    setPrice(response.data.price)
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }, [from, to, car])

    const createReservation = () => {
        axios.post(
            process.env.REACT_APP_API_URL + '/api/reservation',
            {
                agent: reservationAgent.value,
                fromId: from.value,
                toId: to.value,
                car: car.value,
                price: price,
                reservationDate: new Date(reservationDate['$d']),
                passengerName,
                passengerPhone,
                passengerEmail,
                passengerAdultsCount,
                passengerChildsCount,
                passengerBabyChair,
                amplifier,
                passengerPay,
                passengerPayCurrency,
                currency,
                driverNote,
                operationNote,
                flightNo
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
            setPassengerEmail('')
            setPassengerAdultsCount()
            setPassengerChildsCount()
            setPassengerBabyChair()
            setAmplifier()
            setPassengerPay()
            setDriverNote('')
            setOperationNote('')
            setFlightNo('')
        }).catch(error => {
            console.log(error)
        })
    }

    const getSections = () => {
        axios.get(
            process.env.REACT_APP_API_URL + '/api/section'
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
            process.env.REACT_APP_API_URL + '/api/car'
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
            process.env.REACT_APP_API_URL + '/api/agent'
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
        }),
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
                            <Button variant="success" onClick={createReservation}>Yeni Rezervasyon Oluştur</Button>
                        </Form.Group>
                    </Form>
                </Row>
            </Container>
        </div>
    )
}