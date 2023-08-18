import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Select from 'react-select';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { DateTimeField } from '@mui/x-date-pickers';
import axios from "axios";
import dayjs from "dayjs";

export default function ReservationEditModal(props) {

  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const [car, setCar] = useState()
  const [price, setPrice] = useState('')
  const [sectionOptions, setSectionOptions] = useState([])
  const [carOptions, setCarOptions] = useState([])
  const [reservationDate, setReservationDate] = useState()
  const [passengerName, setPassengerName] = useState('')
  const [passengerPhone, setPassengerPhone] = useState('')

  useEffect(() => {
    getSections()
    getCars()

    axios.get(
      process.env.REACT_APP_API_URL + `/api/reservation/${props.id}`
    ).then(response => {
      if (response.status === 200) {
        setFrom({ value: response.data.from.id, label: response.data.from.sectionName })
        setTo({ value: response.data.to.id, label: response.data.to.sectionName })
        setCar({ value: response.data.car.id, label: response.data.car.name })
        setPrice(response.data.price)
        setPassengerName(response.data.passengerName)
        setPassengerPhone(response.data.passengerPhone)
        setReservationDate(dayjs(response.data.reservationDate))
      }
    }).catch(error => {
      console.log(error);
    })
  }, [props.id])


  const edit = () => {
    axios.patch(
      process.env.REACT_APP_API_URL + `/api/reservation/${props.id}`,
      {
        from: from.value,
        to: to.value,
        car: car.value,
        price,
        reservationDate: reservationDate['$d'],
        passengerName,
        passengerPhone
      }
    ).then(response => {
      if (response.status === 200) {
        props.onHide()
      }
    }).catch(error => {
      console.log(error);
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
          alignItems: 'center',
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
                  value={reservationDate}
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
            <Form.Label>Fiyat</Form.Label>
            <Form.Control type="text" placeholder="Fiyat" value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Yolcu Adı</Form.Label>
            <Form.Control type="text" placeholder="Yolcu adı" value={passengerName} onChange={(e) => setPassengerName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Yolcu iletişim bilgisi</Form.Label>
            <Form.Control type="text" placeholder="Yolcu iletişim bilgisi" value={passengerPhone} onChange={(e) => setPassengerPhone(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#282c34' }}>
        <Button variant='secondary' onClick={props.onHide}>Kapat</Button>
        <Button variant='success' onClick={edit}>Düzenle</Button>
      </Modal.Footer>
    </Modal>
  )
}