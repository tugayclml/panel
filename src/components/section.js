import { useEffect, useState } from 'react';
import { Navbar, Container, Row, Col, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import SectionEditModal from './modals/sectionEditModal';
import DeleteModal from './modals/deleteModal';
import { Link, useNavigate } from 'react-router-dom';

export default function Sections() {
  const navigate = useNavigate()

  const [sections, setSections] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [lastSectionId, setLastSectionId] = useState()

  useEffect(() => {
    getSections()
  }, [])

  const getSections = () => {
    axios.get(
      'http://localhost:5000/api/section'
    ).then(response => {
      if (response.data && response.status === 200) {
        setSections([])
        setSections(response.data)
      }
    }).catch(error => {
      console.log(error)
    })
  }

  const openAddSectionScreen = () => {
    navigate("/addSection")
  }

  const editSection = (id) => {
    navigate("/editSection", { state: { sectionId: id } })
  }

  const deleteSection = (sectionId) => {
    setDeleteModalShow(true)
    setLastSectionId(sectionId)
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
          <Link to="/sections" style={{ ...linkStyle, ...activeLink }}>Bölgeler</Link>
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
                  <th>Bölge Adı</th>
                  <th>İl</th>
                  <th>İlçe</th>
                  <th>Semt</th>
                  <th>Açıklama</th>
                  <th>Düzenle</th>
                  <th>Sil</th>
                </tr>
              </thead>
              <tbody>
                {
                  sections.map(section => {
                    return (
                      <tr key={section.id}>
                        <td>{section.sectionName}</td>
                        <td>{JSON.parse(section.city).label}</td>
                        <td>{JSON.parse(section.district).label}</td>
                        <td>{section.street}</td>
                        <td>{section.description}</td>
                        <td><Button type="submit" variant='secondary' onClick={() => editSection(section.id)}><BsFillPencilFill /></Button></td>
                        <td><Button type="submit" variant='secondary' onClick={() => deleteSection(section.id)}><BsFillTrash3Fill /></Button></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </Col>
          <Col>
            <div style={{
              color: 'white',
              textAlign: 'start',
              alignItems: 'center',
              borderRadius: 20,
              borderColor: 'white',
              borderStyle: 'solid',
              padding: 20,
            }}>

              <h2 style={{ color: 'white' }}>Bölgeler</h2>
              <ul>
                <li style={{ backgroundColor: '#282c34', color: 'white' }} onClick={openAddSectionScreen}>
                  Yeni Bölge Ekle
                </li>
              </ul>

            </div>
          </Col>
        </Row>
      </Container>

      {
        modalShow && <SectionEditModal show={modalShow}
          onHide={() => {
            setModalShow(false)
            getSections()
          }
          } id={lastSectionId} />
      }

      {
        deleteModalShow && <DeleteModal show={deleteModalShow}
          onHide={() => {
            setDeleteModalShow(false)
            getSections()
          }
          } id={lastSectionId} type={'section'} />
      }
    </div>
  )
}