import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navbar, Container, Table, Button, Row, Col } from 'react-bootstrap';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';
import DeleteModal from './modals/deleteModal';
import { Link, useNavigate } from 'react-router-dom';

export default function Color() {
  const navigate = useNavigate()

  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [colors, setColors] = useState([])
  const [lastCarId, setLastCarId] = useState()

  useEffect(() => {
    getColors()
  }, [])

  const getColors = () => {
    axios.get(
      'http://localhost:5000/api/color'
    ).then(response => {
      if (response.status === 200) setColors(response.data)
    }).catch(error => {
      console.log(error);
    })
  }

  const openAddColorScreen = () => {
    navigate("/addColor")
  }

  const editColor = (colorId) => {
    navigate("/editColor", { state: { colorId: colorId } })
  }

  const deleteColor = (carId) => {
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
          <Link to="/cars" style={{ ...linkStyle, ...passiveLink }}>Araçlar</Link>
          <Link to="/employees" style={{ ...linkStyle, ...passiveLink }}>Şöförler</Link>
          <Link to="/employees" style={{ ...linkStyle, ...activeLink }}>Renkler</Link>
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
                  <th>İsim</th>
                  <th>Renk</th>
                  <th>Düzenle</th>
                  <th>Sil</th>
                </tr>
              </thead>
              <tbody>
                {
                  colors.map(color => {
                    return (
                      <tr key={color.id}>
                        <td>{color.id}</td>
                        <td>{color.name}</td>
                        <td><Button style={{ width: 70, height: 30, backgroundColor: color.colorCode, borderColor: color.colorCode }} /></td>
                        <td><Button type="submit" variant='secondary' onClick={() => editColor(color.id)}><BsFillPencilFill /></Button></td>
                        <td><Button type="submit" variant='secondary' onClick={() => deleteColor(color.id)}><BsFillTrash3Fill /></Button></td>
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

              <h2 style={{ color: 'white' }}>Renkler</h2>
              <ul>
                <li style={{ backgroundColor: '#282c34', color: 'white' }} onClick={openAddColorScreen}>
                  Yeni Renk Ekle
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
            getColors()
          }
          } id={lastCarId} type={'color'} />
      }
    </div>
  )
}