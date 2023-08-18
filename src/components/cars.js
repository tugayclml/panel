import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navbar, Container, Table, Button, Row, Col } from 'react-bootstrap';
import { BsFillPencilFill, BsFillTrash3Fill, BsLink45Deg } from 'react-icons/bs';
import CarEditModal from './modals/carEditModal';
import DeleteModal from './modals/deleteModal';
import { Link, useNavigate } from 'react-router-dom';

export default function Car() {
  const navigate = useNavigate()

  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [cars, setCars] = useState([])
  const [lastCarId, setLastCarId] = useState()

  useEffect(() => {
    getCars()
  }, [])

  const getCars = () => {
    axios.get(
      process.env.REACT_APP_API_URL + '/api/car'
    ).then(response => {
      if (response.status === 200) {
        setCars([])
        setCars(response.data)
      }
    }).catch(error => {
      console.log(error)
    })
  }

  const openAddCarScreen = () => {
    navigate("/addCar")
  }

  const editCar = (carId) => {
    navigate("/editCar", { state: { carId: carId } })
  }

  const showDrivers = (carId) => {
    navigate("/carDrivers", { state: { carId: carId } })
  }

  const deleteCar = (carId) => {
    setDeleteModalShow(true)
    setLastCarId(carId)
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
          <Link to="/sections" style={{ ...linkStyle, ...passiveLink }}>Bölgeler</Link>
          <Link to="/prices" style={{ ...linkStyle, ...passiveLink }}>Fiyatlar</Link>
          <Link to="/agents" style={{ ...linkStyle, ...passiveLink }}>Acenteler</Link>
          <Link to="/cars" style={{ ...linkStyle, ...activeLink }}>Araçlar</Link>
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
                  <th>Araç ismi</th>
                  <th>Model</th>
                  <th>Marka</th>
                  <th>Plaka</th>
                  <th>Yıl</th>
                  <th>Kaç kişilik</th>
                  <th>Şöförler</th>
                  <th>Düzenle</th>
                  <th>Sil</th>
                </tr>
              </thead>
              <tbody>
                {
                  cars.map(car => {
                    return (
                      <tr key={car.id}>
                        <td>{car.id}</td>
                        <td>{car.name}</td>
                        <td>{car.model}</td>
                        <td>{car.make}</td>
                        <td>{car.plate}</td>
                        <td>{car.year}</td>
                        <td>{car.numberOfPeople}</td>
                        <td><Button type="submit" variant='secondary' onClick={() => showDrivers(car.id)}><BsLink45Deg /></Button></td>
                        <td><Button type="submit" variant='secondary' onClick={() => editCar(car.id)}><BsFillPencilFill /></Button></td>
                        <td><Button type="submit" variant='secondary' onClick={() => deleteCar(car.id)}><BsFillTrash3Fill /></Button></td>
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
              <h2 style={{ color: 'white' }}>Araçlar</h2>
              <ul>
                <li style={{ backgroundColor: '#282c34', color: 'white' }} onClick={openAddCarScreen}>
                  Yeni Araç Ekle
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>

      {
        modalShow && <CarEditModal show={modalShow}
          onHide={() => {
            setModalShow(false)
            getCars()
          }
          } id={lastCarId} />
      }

      {
        deleteModalShow && <DeleteModal show={deleteModalShow}
          onHide={() => {
            setDeleteModalShow(false)
            getCars()
          }
          } id={lastCarId} type={'car'} />
      }
    </div>
  )
}