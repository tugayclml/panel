import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { BsFillTrash3Fill } from "react-icons/bs"
import { useLocation } from "react-router-dom"
import DeleteModal from "../modals/deleteModal"

export default function CarDrivers() {
    const location = useLocation()

    const [drivers, setDrivers] = useState([])
    const [deleteModalShow, setDeleteModalShow] = useState(false)
    const [lastDriverId, setLastDriverId] = useState()
    const [driverIds, setDriverIds] = useState()

    useEffect(() => {
        getCarDrivers()
    }, [])

    const getCarDrivers = () => {
        axios.get(process.env.REACT_APP_API_URL + `/api/car/${location.state.carId}`)
            .then(response => {
                setDrivers(response.data.employees)
            }).catch(error => {
                console.log(error);
            })
    }

    const deleteDriverFromCar = (driverId) => {
        console.log(driverId);
        console.log(drivers);
        setDriverIds(drivers.filter(driver => driver.id !== driverId))
        console.log(driverIds);
        setDeleteModalShow(true)
    }

    return (
        <div className="App">
            <Container fluid>
                <h2 style={{ color: 'white', paddingTop: 10, paddingBottom: 10 }}>Sürücüler</h2>

                <Table borderless striped variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Adı</th>
                            <th>Soyadı</th>
                            <th>Telefon Numarası</th>
                            <th>Sil</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            drivers.map(driver => {
                                return (
                                    <tr key={driver.id}>
                                        <td>{driver.id}</td>
                                        <td>{driver.firstName}</td>
                                        <td>{driver.lastName}</td>
                                        <td>{driver.phoneNumber}</td>
                                        <td><Button type="submit" variant='secondary' onClick={() => deleteDriverFromCar(driver.id)}><BsFillTrash3Fill /></Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>

            {
                deleteModalShow && <DeleteModal show={deleteModalShow}
                    onHide={() => {
                        setDeleteModalShow(false)
                        getCarDrivers()
                    }}
                    id={location.state.carId} driverIds={driverIds} type={'carDriver'} />
            }
        </div>
    )
}