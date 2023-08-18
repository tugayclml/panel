import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function GetAgentPrice() {
    const location = useLocation()

    const [agentPrices, setAgentPrices] = useState([])

    useEffect(() => {
        getAgent()
    }, [])

    const getAgent = () => {
        axios.get(
            process.env.REACT_APP_API_URL + `/api/agent/${location.state.agentId}`
        ).then(response => {
            if (response.status === 200) {
                const prices = []
                for (const price of response.data.prices) {
                    prices.push({
                        id: price.id,
                        from: price.from.sectionName,
                        to: price.to.sectionName,
                        car: price.car.name,
                        price: price.price
                    })
                }
                setAgentPrices(prices)
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="App">
            <h2 style={{ color: "white", paddingTop: 10, paddingBottom: 10 }}>Acente Tarife Fiyatları</h2>
            <Container fluid>
                <Row>
                    <Table borderless striped variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nereden</th>
                                <th>Nereye</th>
                                <th>Araç</th>
                                <th>Fiyat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                agentPrices.map(price => {
                                    return (
                                        <tr key={price.id}>
                                            <td>{price.id}</td>
                                            <td>{price.from}</td>
                                            <td>{price.to}</td>
                                            <td>{price.car}</td>
                                            <td>{price.price}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Row>
            </Container>

        </div>
    )
}