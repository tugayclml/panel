import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function PriceListBySection() {

    const location = useLocation()

    const [from, setFrom] = useState(location.state.from.sectionName)
    const [to, setTo] = useState(location.state.to.sectionName)
    const [priceList, setPriceList] = useState([])

    useEffect(() => {
        getPrice()
    }, [])

    const getPrice = () => {
        axios.get(
            process.env.REACT_APP_API_URL + `/api/price/list?from=${location.state.from.id}&to=${location.state.to.id}`
        ).then(response => {
            console.log(response);
            if (response.status === 200) {
                setPriceList(response.data)
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="App">
            <h2 style={{ color: "white", paddingTop: 10, paddingBottom: 10 }}> {from} - {to} Bölge Fiyatları</h2>
            <Container fluid>
                <Table borderless striped variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Acente</th>
                            <th>Araç</th>
                            <th>Fiyat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            priceList.map(price => {
                                return (
                                    <tr key={price.id}>
                                        <td>{price.id}</td>
                                        <td>{price.agent.name}</td>
                                        <td>{price.car.name}</td>
                                        <td>{price.price}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}