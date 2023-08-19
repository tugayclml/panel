import { DesktopDatePicker, DesktopDateTimePicker, LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function OperationDate() {
    const navigate = useNavigate()

    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    const getOperations = () => {
        console.log(startDate)
        console.log(endDate);
        navigate("/operations", { state: { startDate: new Date(startDate['$d']), endDate: new Date(endDate['$d']) } })
    }

    const activeLink = {
        color: 'white'
    }

    const passiveLink = {
        color: 'grey'
    }

    const linkStyle = {
        textDecoration: 'none',
        fontSize: 20
    }

    return (
        <div className="App">
            <Navbar bg="dark" variant='dark' expand="lg">
                <Container>
                    <Link to="/reservations" style={{ ...linkStyle, ...passiveLink }}>Rezervasyonlar</Link>
                    <Link to="/operationFilter" style={{ ...linkStyle, ...activeLink }}>Operasyon</Link>
                    <Link to="/sections" style={{ ...linkStyle, ...passiveLink }}>Bölgeler</Link>
                    <Link to="/prices" style={{ ...linkStyle, ...passiveLink }}>Fiyatlar</Link>
                    <Link to="/agents" style={{ ...linkStyle, ...passiveLink }}>Acenteler</Link>
                    <Link to="/cars" style={{ ...linkStyle, ...passiveLink }}>Araçlar</Link>
                    <Link to="/employees" style={{ ...linkStyle, ...passiveLink }}>Şöförler</Link>
                    <Link to="/login" style={{ float: 'right' }}>Çıkış</Link>
                </Container>
            </Navbar>

            <Container>
                <Form style={{
                    color: 'white',
                    textAlign: 'start',
                    alignItems: 'center',
                    borderRadius: 20,
                    borderColor: 'white',
                    borderStyle: 'solid',
                    padding: 20,
                    marginTop: 20
                }}>

                    <Form.Group className="mb-3">
                        <Form.Label>Başlangıç Tarihi</Form.Label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem>
                                <MobileDateTimePicker
                                    onChange={(newValue) => setStartDate(newValue)}
                                    ampm={false}
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
                        <Form.Label>Bitiş Tarihi</Form.Label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem>
                                <MobileDateTimePicker
                                    onChange={(newValue) => setEndDate(newValue)}
                                    ampm={false}
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
                        <Button variant="success" onClick={getOperations}>Filtreyi uygula</Button>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    )
}