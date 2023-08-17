import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Navbar, Container, Row, Col, Button, Table } from 'react-bootstrap';
import { BsFillPencilFill, BsFillTrash3Fill, BsLink45Deg } from "react-icons/bs";
import PriceEditModal from './modals/priceEditModal';
import DeleteModal from './modals/deleteModal';
import { Link, useNavigate } from 'react-router-dom';

export default function Price() {
    const navigate = useNavigate()

    const [modalShow, setModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [lastPriceId, setLastPriceId] = useState()
    const [prices, setPrices] = useState([])

    const getPrices = useCallback(() => {
        axios.get(
            'http://localhost:5000/api/price'
        ).then(response => {
            console.log(response);
            if (response.status === 200) {
                setPrices(response.data)
            }
        }).catch(error => {
            console.log(error);
        })
    }, [])

    useEffect(() => {
        getPrices()
    }, [getPrices])

    const editPrice = (id) => {
        navigate("/editPrice", { state: { priceId: id } })
    }

    const deletePrice = (id) => {
        setDeleteModalShow(true)
        setLastPriceId(id)
    }

    const openAddNewPriceScreen = () => {
        navigate("/addPrice")
    }

    const examinePrices = (id, from, to) => {
        navigate("/priceList", { state: { priceId: id, from, to } })
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
                    <Link to="/prices" style={{ ...linkStyle, ...activeLink }}>Fiyatlar</Link>
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
                                    <th>Nereden</th>
                                    <th>Nereye</th>
                                    <th>Fiyat</th>
                                    <th>Düzenle</th>
                                    <th>Sil</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    prices.map(price => {
                                        return (
                                            <tr key={price.id}>
                                                <td>{price.id}</td>
                                                <td>{price.from.sectionName}</td>
                                                <td>{price.to.sectionName}</td>
                                                <td><Button type="submit" variant='secondary' onClick={() => examinePrices(price.id, price.from, price.to)}><BsLink45Deg /></Button></td>
                                                <td><Button type="submit" variant='secondary' onClick={() => editPrice(price.id)}><BsFillPencilFill /></Button></td>
                                                <td><Button type="submit" variant='secondary' onClick={() => deletePrice(price.id)}><BsFillTrash3Fill /></Button></td>
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
                            <h2 style={{ color: 'white' }}>Fiyatlar</h2>
                            <ul>
                                <li style={{ backgroundColor: '#282c34', color: 'white' }} onClick={openAddNewPriceScreen}>
                                    Yeni Fiyat Ekle
                                </li>
                            </ul>

                        </div>
                    </Col>
                </Row>
            </Container>

            {
                modalShow && <PriceEditModal show={modalShow}
                    onHide={() => {
                        setModalShow(false)
                        getPrices()
                    }
                    } id={lastPriceId} />
            }

            {
                deleteModalShow && <DeleteModal show={deleteModalShow}
                    onHide={() => {
                        setDeleteModalShow(false)
                        getPrices()
                    }
                    } id={lastPriceId} type={'price'} />
            }
        </div>
    )
}