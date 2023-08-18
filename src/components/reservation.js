import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navbar, Container, Table, Button, Row, Col } from 'react-bootstrap';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';
import DeleteModal from './modals/deleteModal';
import { Link, useNavigate } from 'react-router-dom';

export default function Reservation() {
  const navigate = useNavigate()

  const [acceptedReservations, setAcceptedReservations] = useState([])
  const [waitingReservations, setWaitingReservations] = useState([])
  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const [lastReservationId, setLastReservationId] = useState()

  useEffect(() => {
    getAcceptedReservations()
    getWaitingReservations()
  }, [])

  const approveReservation = (reservationId) => {
    axios.patch(
      process.env.REACT_APP_API_URL + `/api/reservation/${reservationId}/approve`,
    ).then(response => {
      if (response.status === 200) {
        getAcceptedReservations()
        getWaitingReservations()
      }
    }).catch(error => {
      console.log(error);
    })
  }

  const declineReservation = (reservationId) => {
    axios.patch(
      process.env.REACT_APP_API_URL + `/api/reservation/${reservationId}/decline`,
    ).then(response => {
      if (response.status === 200) {
        getAcceptedReservations()
        getWaitingReservations()
      }
    }).catch(error => {
      console.log(error);
    })
  }

  const getAcceptedReservations = () => {
    axios.get(
      process.env.REACT_APP_API_URL + '/api/reservation/status/Onaylandı'
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
      process.env.REACT_APP_API_URL + '/api/reservation/status/Beklemede'
    ).then(response => {
      if (response.status === 200) {
        setWaitingReservations(response.data);
      }
    }).catch(error => {
      console.log(error);
    })
  }

  const editReservation = (id) => {
    navigate('/editReservation', { state: { reservationId: id } })
  }

  const deleteReservation = (id) => {
    setLastReservationId(id)
    setDeleteModalShow(true)
  }

  const openAddReservationScreen = () => {
    navigate('/addReservation')
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
          <Link to="/reservations" style={{ ...linkStyle, ...activeLink }}>Rezervasyonlar</Link>
          <Link to="/sections" style={{ ...linkStyle, ...passiveLink }}>Bölgeler</Link>
          <Link to="/prices" style={{ ...linkStyle, ...passiveLink }}>Fiyatlar</Link>
          <Link to="/agents" style={{ ...linkStyle, ...passiveLink }}>Acenteler</Link>
          <Link to="/cars" style={{ ...linkStyle, ...passiveLink }}>Araçlar</Link>
          <Link to="/employees" style={{ ...linkStyle, ...passiveLink }}>Şöförler</Link>
          <Link to="/login" style={{ float: 'right' }}>Çıkış</Link>
        </Container>
      </Navbar>

      <Container fluid>
        <Row style={{ marginTop: 40 }}>
          <Col lg="10">
            <Table borderless striped variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Acente</th>
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
                        <td>{reservation.agent ? reservation.agent.name : ''}</td>
                        <td>{reservation.from.sectionName}</td>
                        <td>{reservation.to.sectionName}</td>
                        <td>{reservation.car.name}</td>
                        <td>{reservation.price}</td>
                        <td>{reservation.reservationDate}</td>
                        <td>{reservation.passengerName}</td>
                        <td>{reservation.passengerPhone}</td>
                        <td>{
                          reservation.status === "Beklemede" ?
                            <div>
                              <Button type="submit" variant='success' onClick={() => approveReservation(reservation.id)} style={{ margin: 5 }}>Onayla</Button>
                              <Button type="submit" variant='danger' onClick={() => declineReservation(reservation.id)} style={{ margin: 5 }}>İptal Et</Button>
                            </div>
                            :
                            reservation.status
                        }
                        </td>
                        {
                          reservation.status === "Onaylandı" ?
                            <td></td> :
                            <td><Button type="submit" variant='secondary' onClick={() => editReservation(reservation.id)}><BsFillPencilFill /></Button></td>
                        }
                        {
                          reservation.status === "Onaylandı" ?
                            <td></td> :
                            <td><Button type="submit" variant='secondary' onClick={() => deleteReservation(reservation.id)}><BsFillTrash3Fill /></Button></td>
                        }
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>

            <Table borderless striped variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Acente</th>
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
                        <td>{reservation.agent ? reservation.agent.name : ''}</td>
                        <td>{reservation.from.sectionName}</td>
                        <td>{reservation.to.sectionName}</td>
                        <td>{reservation.car.name}</td>
                        <td>{reservation.price}</td>
                        <td>{reservation.reservationDate}</td>
                        <td>{reservation.passengerName}</td>
                        <td>{reservation.passengerPhone}</td>
                        <td>{
                          reservation.status === "Beklemede" ?
                            <div>
                              <Button type="submit" variant='success' onClick={() => approveReservation(reservation.id)} style={{ margin: 5 }}>Onayla</Button>
                              <Button type="submit" variant='danger' onClick={() => declineReservation(reservation.id)} style={{ margin: 5 }}>İptal Et</Button>
                            </div>
                            :
                            reservation.status
                        }
                        </td>
                        {
                          reservation.status === "Onaylandı" ?
                            <td></td> :
                            <td><Button type="submit" variant='secondary' onClick={() => editReservation(reservation.id)}><BsFillPencilFill /></Button></td>
                        }
                        {
                          reservation.status === "Onaylandı" ?
                            <td></td> :
                            <td><Button type="submit" variant='secondary' onClick={() => deleteReservation(reservation.id)}><BsFillTrash3Fill /></Button></td>
                        }
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
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
                <li style={{ backgroundColor: '#282c34', color: 'white' }} onClick={openAddReservationScreen}>
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