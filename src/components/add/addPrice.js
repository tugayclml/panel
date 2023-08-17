import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Select from 'react-select';

export default function AddPrice() {
    const [car, setCar] = useState()
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [price, setPrice] = useState('')
    const [sectionOptions, setSectionOptions] = useState([])
    const [selectedAgent, setSelectedAgent] = useState()
    const [agentOptions, setAgentOptions] = useState([])
    const [carOptions, setCarOptions] = useState([])

    useEffect(() => {
        getAgents()
        getCars()
        getSections()
    }, [])

    const getAgents = () => {
        axios.get(
            'http://localhost:5000/api/agent'
        ).then(response => {
            if (response.status === 200) {
                const agents = []
                for (const agent of response.data) {
                    agents.push({ value: agent.id, label: agent.name })
                }
                setAgentOptions(agents)
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const getCars = () => {
        axios.get(
            'http://localhost:5000/api/car'
        ).then(response => {
            if (response.status === 200) {
                const cars = []
                for (const car of response.data) {
                    cars.push({ value: car.id, label: car.name })
                }
                setCarOptions(cars)
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const getSections = () => {
        axios.get(
            'http://localhost:5000/api/section'
        ).then(response => {
            if (response.status === 200) {
                const sections = []
                for (const section of response.data) {
                    sections.push({ value: section.id, label: section.sectionName })
                }
                setSectionOptions(sections)
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const createPrice = () => {
        axios.post(
            'http://localhost:5000/api/price',
            {
                carId: car.value,
                fromId: from.value,
                toId: to.value,
                price,
                agentId: selectedAgent.value
            }
        ).then(response => {
            if (response.status === 201) {
                setFrom('')
                setTo('')
                setCar('')
                setPrice()
                setSelectedAgent()
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const customStyles = {
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: state.isSelected ? "#212529" : "#fff",
            backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
        })
    };

    return (
        <div className="App">
            <h2 style={{ color: "white", paddingTop: 10, paddingBottom: 10 }}>Fiyat Ekle</h2>
            <Form style={{
                color: 'white',
                textAlign: 'start',
                alignItems: 'center',
                borderRadius: 20,
                borderColor: 'white',
                borderStyle: 'solid',
                padding: 20,
            }}>
                <Form.Group className="mb-3">
                    <Form.Label>Acente</Form.Label>
                    <Select options={agentOptions} value={selectedAgent || ''} onChange={(choice) => setSelectedAgent(choice)} color='black'
                        styles={customStyles}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nereden</Form.Label>
                    <Select options={sectionOptions} value={from || ''} onChange={(choice) => setFrom(choice)} color='black'
                        styles={customStyles}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nereye</Form.Label>
                    <Select options={sectionOptions} value={to || ''} onChange={(choice) => setTo(choice)} color='black'
                        styles={customStyles}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Araç</Form.Label>
                    <Select options={carOptions} value={car || ''} onChange={(choice) => setCar(choice)} color='black'
                        styles={customStyles}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Fiyat</Form.Label>
                    <Form.Control type="number" placeholder="Fiyat" value={price || ''} onChange={(e) => setPrice(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Button variant="success" onClick={createPrice}>Fiyat Ekle</Button>
                </Form.Group>
            </Form>
        </div>
    )
}