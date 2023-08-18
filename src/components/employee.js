import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navbar, Container, Table, Button, Row, Col } from 'react-bootstrap';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';
import DeleteModal from './modals/deleteModal';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeEditModal from './modals/employeeEditModal';

export default function Employee() {
  const navigate = useNavigate()

  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [employees, setEmployees] = useState([])
  const [lastCarId, setLastCarId] = useState()

  useEffect(() => {
    getEmployees()
  }, [])

  const getEmployees = () => {
    axios.get(
      process.env.REACT_APP_API_URL + '/api/employee'
    ).then(response => {
      if (response.status === 200) setEmployees(response.data)
    }).catch(error => {
      console.log(error);
    })
  }

  const openAddEmployeeScreen = () => {
    navigate("/addEmployee")
  }

  const editEmployee = (employeeId) => {
    navigate("/editEmployee", { state: { employeeId: employeeId } })
  }

  const deleteEmployee = (carId) => {
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
          <Link to="/employees" style={{ ...linkStyle, ...activeLink }}>Şöförler</Link>
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
                  <th>Ad</th>
                  <th>Soyad</th>
                  <th>Cinsiyet</th>
                  <th>Uyruk</th>
                  <th>Adres</th>
                  <th>İletişim</th>
                  <th>TC Kimlik No</th>
                  <th>Düzenle</th>
                  <th>Sil</th>
                </tr>
              </thead>
              <tbody>
                {
                  employees.map(employee => {
                    return (
                      <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.gender}</td>
                        <td>{employee.nationality}</td>
                        <td>{employee.address}</td>
                        <td>{employee.phoneNumber}</td>
                        <td>{employee.identificationNumber}</td>
                        <td><Button type="submit" variant='secondary' onClick={() => editEmployee(employee.id)}><BsFillPencilFill /></Button></td>
                        <td><Button type="submit" variant='secondary' onClick={() => deleteEmployee(employee.id)}><BsFillTrash3Fill /></Button></td>
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

              <h2 style={{ color: 'white' }}>Şöförler</h2>
              <ul>
                <li style={{ backgroundColor: '#282c34', color: 'white' }} onClick={openAddEmployeeScreen}>
                  Yeni Şöför Ekle
                </li>
              </ul>

            </div>
          </Col>
        </Row>
      </Container>

      {
        modalShow && <EmployeeEditModal show={modalShow}
          onHide={() => {
            setModalShow(false)
            getEmployees()
          }
          } id={lastCarId} />
      }

      {
        deleteModalShow && <DeleteModal show={deleteModalShow}
          onHide={() => {
            setDeleteModalShow(false)
            getEmployees()
          }
          } id={lastCarId} type={'employee'} />
      }
    </div>
  )
}