import axios from 'axios';
import { useState, useEffect } from 'react'
import { Navbar, Container, Row, Col, Button, Table, Pagination } from 'react-bootstrap';
import { BsFillPencilFill, BsFillTrash3Fill, BsLink45Deg } from "react-icons/bs";
import DeleteModal from './modals/deleteModal'
import { Link, useNavigate } from 'react-router-dom';

export default function Agent() {

  const alphabet = [
    'A',
    'B',
    'C',
    'Ç',
    'D',
    'E',
    'F',
    'G',
    'Ğ',
    'H',
    'İ',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'Ö',
    'P',
    'R',
    'S',
    'Ş',
    'T',
    'U',
    'Ü',
    'V',
    'Y',
    'Z'
  ]

  const navigate = useNavigate();

  const [agents, setAgents] = useState([])
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [lastAgentId, setLastAgentId] = useState()
  const [active, setActive] = useState('A')

  useEffect(() => {
    getAgents()
  }, [])

  const getAgents = () => {
    axios.get(
      process.env.REACT_APP_API_URL + '/api/agent/letter/A'
    ).then(response => {
      if (response.status === 200) {
        setAgents(response.data)
      }
    }).catch(error => {
      console.log(error);
    })
  }

  const editAgent = (agentId) => {
    navigate("/editAgent", { state: { agentId: agentId } })
  }

  const deleteAgent = (agentId) => {
    setLastAgentId(agentId)
    setDeleteModalShow(true)
  }

  const clickhedLetter = (letter) => {
    setActive(letter)
    axios.get(
      process.env.REACT_APP_API_URL + `/api/agent/letter/${letter}`
    ).then(response => {
      setAgents(response.data)
    }).catch(error => {
      console.log(error);
    })
  }

  const getPrices = (id) => {
    navigate("/addAgentPrices", { state: { agentId: id } })
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

  const openAddAgentScreen = () => {
    navigate('/addAgent')
  }

  return (
    <div className="App">
      <Navbar bg="dark" variant='dark' expand="lg">
        <Container>
          <Link to="/reservations" style={{ ...linkStyle, ...passiveLink }}>Rezervasyonlar</Link>
          <Link to="/sections" style={{ ...linkStyle, ...passiveLink }}>Bölgeler</Link>
          <Link to="/prices" style={{ ...linkStyle, ...passiveLink }}>Fiyatlar</Link>
          <Link to="/agents" style={{ ...linkStyle, ...activeLink }}>Acenteler</Link>
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
                  <th>İsmi</th>
                  <th>Şifre</th>
                  <th>Telefon numarası</th>
                  <th>Fiyatlar</th>
                  <th>Düzenle</th>
                  <th>Sil</th>
                </tr>
              </thead>
              <tbody>
                {
                  agents.map(agent => {
                    return (
                      <tr key={agent.id}>
                        <td>{agent.id}</td>
                        <td>{agent.name}</td>
                        <td>{agent.password}</td>
                        <td>{agent.phoneNumber}</td>
                        <td><Button type="submit" variant='secondary' onClick={() => getPrices(agent.id)}><BsLink45Deg /></Button></td>
                        <td><Button type="submit" variant='secondary' onClick={() => editAgent(agent.id)}><BsFillPencilFill /></Button></td>
                        <td><Button type="submit" variant='secondary' onClick={() => deleteAgent(agent.id)}><BsFillTrash3Fill /></Button></td>
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

              <h2 style={{ color: 'white' }}>Acenteler</h2>
              <ul>
                <li style={{ backgroundColor: '#282c34', color: 'white' }} onClick={openAddAgentScreen}>
                  Yeni Acente Ekle
                </li>
                <li style={{ backgroundColor: '#282c34', color: 'white' }} onClick={getAgents}>
                  Tüm Acenteler
                </li>
              </ul>

            </div>
          </Col>

        </Row>
        <Row>
          <Pagination style={{ padding: 10 }}>
            {
              alphabet.map(letter => {
                return (
                  <Pagination.Item key={letter} active={letter === active} onClick={() => clickhedLetter(letter)}>
                    {letter}
                  </Pagination.Item>
                )
              })
            }
          </Pagination>
        </Row>
      </Container>

      {
        deleteModalShow && <DeleteModal show={deleteModalShow}
          onHide={() => {
            setDeleteModalShow(false)
            getAgents()
          }
          } id={lastAgentId} type={'agent'} />
      }
    </div>
  )
}