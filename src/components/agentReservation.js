import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navbar, Container, Table, Button, Row, Col } from 'react-bootstrap';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';
import DeleteModal from './modals/deleteModal';
import ReservationEditModal from './modals/reservationEditModal';
import { Link, useNavigate } from 'react-router-dom';

export default function AgentReservation() {
  const token = localStorage.getItem('accessToken')

  const navigate = useNavigate()

  const [acceptedReservations, setAcceptedReservations] = useState([])
  const [waitingReservations, setWaitingReservations] = useState([])
  const [editModalShow, setEditModalShow] = useState(false)
  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const [lastReservationId, setLastReservationId] = useState()

  useEffect(() => {
    getAcceptedReservations()
    getWaitingReservations()
  }, [])

  const getAcceptedReservations = () => {
    axios.get(
      'http://localhost:5000/api/agent/reservations/Onaylandı',
      {
        headers: {
          'Authorization': token
        }
      }
    ).then(response => {
      if (response.status === 200) {
        setAcceptedReservations(response.data);
      }
    }).catch(error => {
      console.log(error);
    })
  }

  const getWaitingReservations = () => {
    axios.get(
      'http://localhost:5000/api/agent/reservations/Beklemede',
      {
        headers: {
          'Authorization': token
        }
      }
    ).then(response => {
      if (response.status === 200) {
        setWaitingReservations(response.data);
      }
    }).catch(error => {
      console.log(error);
    })
  }

  const editReservation = (id) => {
    setLastReservationId(id)
    setEditModalShow(true)
  }

  const deleteReservation = (id) => {
    setLastReservationId(id)
    setDeleteModalShow(true)
  }

  const openAddAgentReservationScreen = () => {
    navigate('/addAgentReservation')
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
        <Container style={{ justifyContent: 'center' }}>
          <Link to="/agentReservations" style={{ ...linkStyle, ...activeLink }}>Acente Rezervasyonları</Link>
        </Container>
      </Navbar>

      <Container fluid>
        <Row style={{ marginTop: 20 }}>
          <Col lg="10">
              <h3 style={{ color: 'white', margin: 10 }}>Onaylananlar</h3>
              <Table borderless striped variant="dark" style={{margin: 10}}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nereden</th>
                    <th>Nereye</th>
                    <th>Araç</th>
                    <th>Fiyat</th>
                    <th>Tarih</th>
                    <th>Müşteri adı</th>
                    <th>Müşteri telefonu</th>
                    <th>Statü</th>
                    <th>Düzenle</th>
                    <th>Sil</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    acceptedReservations.map(reservation => {
                      return (
                        <tr key={reservation.id}>
                          <td>{reservation.id}</td>
                          <td>{reservation.from.sectionName}</td>
                          <td>{reservation.to.sectionName}</td>
                          <td>{reservation.car.name}</td>
                          <td>{reservation.price}</td>
                          <td>{reservation.reservationDate}</td>
                          <td>{reservation.passengerName}</td>
                          <td>{reservation.passengerPhone}</td>
                          <td>{reservation.status}</td>
                          {
                            reservation.status === "Onaylandı" ?
                              <td><Button disabled type="submit" variant='secondary' onClick={() => editReservation(reservation.id)}><BsFillPencilFill /></Button></td> :
                              <td><Button type="submit" variant='secondary' onClick={() => editReservation(reservation.id)}><BsFillPencilFill /></Button></td>
                          }
                          {
                            reservation.status === "Onaylandı" ?
                              <td><Button disabled type="submit" variant='danger' onClick={() => deleteReservation(reservation.id)}><BsFillTrash3Fill /></Button></td> :
                              <td><Button type="submit" variant='danger' onClick={() => deleteReservation(reservation.id)}><BsFillTrash3Fill /></Button></td>
                          }
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            <Row>
              <h3 style={{ color: 'white', margin: 10 }}>Onay Bekleyenler</h3>
              <Table borderless striped variant="dark" style={{margin: 10}}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nereden</th>
                    <th>Nereye</th>
                    <th>Araç</th>
                    <th>Fiyat</th>
                    <th>Tarih</th>
                    <th>Müşteri adı</th>
                    <th>Müşteri telefonu</th>
                    <th>Statü</th>
                    <th>Düzenle</th>
                    <th>Sil</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    waitingReservations.map(reservation => {
                      return (
                        <tr key={reservation.id}>
                          <td>{reservation.id}</td>
                          <td>{reservation.from.sectionName}</td>
                          <td>{reservation.to.sectionName}</td>
                          <td>{reservation.car.name}</td>
                          <td>{reservation.price}</td>
                          <td>{reservation.reservationDate}</td>
                          <td>{reservation.passengerName}</td>
                          <td>{reservation.passengerPhone}</td>
                          <td>{reservation.status}</td>
                          {
                            reservation.status === "Onaylandı" ?
                              <td><Button disabled type="submit" variant='secondary' onClick={() => editReservation(reservation.id)}><BsFillPencilFill /></Button></td> :
                              <td><Button type="submit" variant='secondary' onClick={() => editReservation(reservation.id)}><BsFillPencilFill /></Button></td>
                          }
                          {
                            reservation.status === "Onaylandı" ?
                              <td><Button disabled type="submit" variant='danger' onClick={() => deleteReservation(reservation.id)}><BsFillTrash3Fill /></Button></td> :
                              <td><Button type="submit" variant='danger' onClick={() => deleteReservation(reservation.id)}><BsFillTrash3Fill /></Button></td>
                          }
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </Row>

          </Col>
          <Col lg="2">
            <div style={{
              color: 'white',
              textAlign: 'start',
              alignItems: 'center',
              borderRadius: 20,
              borderColor: 'white',
              borderStyle: 'solid',
              padding: 20,
            }}>

              <h2 style={{ color: 'white' }}>Rezervasyonlar</h2>
              <ul>
                <li style={{ backgroundColor: '#282c34', color: 'white' }} onClick={openAddAgentReservationScreen}>
                  Yeni Rezervasyon Ekle
                </li>
              </ul>

            </div>
          </Col>
        </Row>
      </Container>

      {
        deleteModalShow && <DeleteModal show={deleteModalShow}
          onHide={() => {
            setDeleteModalShow(false)
            getAcceptedReservations()
            getWaitingReservations()
          }
          } id={lastReservationId} type={'reservation'} />
      }
    </div>
  )
}