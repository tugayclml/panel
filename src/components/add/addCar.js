import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import { Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

export default function AddCar() {
    const theme = useTheme();

    const [name, setName] = useState('')
    const [model, setModel] = useState('')
    const [make, setMake] = useState('')
    const [year, setYear] = useState('')
    const [plate, setPlate] = useState('')
    const [numberOfPeople, setNumberOfPeople] = useState('')
    const [employeeList, setEmployeeList] = useState([]);
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getEmployees()
    }, [])

    const getEmployees = () => {
        axios.get(
            process.env.REACT_APP_API_URL + '/api/employee'
        ).then(response => {
            setEmployees(response.data)
        })
    }

    const ITEM_HEIGHT = 46;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    function getStyles(name, employeeList) {
        return {
            fontWeight:
                employeeList.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const createCar = () => {
        const driverIds = []
        for (const driver of employeeList) {
            driverIds.push(driver.id)
        }

        axios.post(
            process.env.REACT_APP_API_URL + '/api/car',
            {
                name,
                model,
                numberOfPeople,
                make,
                year,
                plate,
                employeeIds: driverIds
            }
        ).then(response => {
            if (response.status === 201) {
                setName('')
                setModel('')
                setNumberOfPeople('')
                setMake('')
                setYear('')
                setPlate('')
                setEmployeeList([])
            }
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="App">
            <h2 style={{ color: "white", paddingTop: 10, paddingBottom: 10 }}>Yeni Araç Ekle</h2>
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
                    <Form.Label>Araç ismi</Form.Label>
                    <Form.Control type="text" value={name} placeholder="Araç ismi" onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" value={model} placeholder="Model" onChange={(e) => setModel(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Marka</Form.Label>
                    <Form.Control type="text" value={make} placeholder="Marka" onChange={(e) => setMake(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Plaka</Form.Label>
                    <Form.Control type="text" value={plate} placeholder="Plaka" onChange={(e) => setPlate(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Yıl</Form.Label>
                    <Form.Control type="text" value={year} placeholder="Yıl" onChange={(e) => setYear(e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Şöförler</Form.Label>
                    <br />
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={employeeList}
                        onChange={(e) => setEmployeeList(e.target.value)}
                        style={{ backgroundColor: "white", borderRadius: 20, width: '100%' }}
                        renderValue={(selected) => (
                            <Stack gap={1} direction="row" flexWrap="wrap">
                                {selected.map((value) => (
                                    <Chip
                                        key={value.id}
                                        label={value.firstName + ' ' + value.lastName}
                                        onDelete={() =>
                                            setEmployeeList(
                                                employeeList.filter((item) => item !== value)
                                            )
                                        }
                                        deleteIcon={
                                            <CancelIcon
                                                onMouseDown={(event) => event.stopPropagation()}
                                            />
                                        }
                                    />
                                ))}
                            </Stack>
                        )}
                        MenuProps={MenuProps}
                    >
                        {employees.map((employee) => (
                            <MenuItem
                                key={employee.id}
                                value={employee}
                                style={getStyles(employee.firstName + ' ' + employee.lastName, employeeList)}
                            >
                                {employee.firstName + ' ' + employee.lastName}
                            </MenuItem>
                        ))}
                    </Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Kaç kişilik</Form.Label>
                    <Form.Control type="text" value={numberOfPeople} placeholder="Kaç kişilik" onChange={(e) => setNumberOfPeople(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Button variant="success" onClick={createCar}>Yeni Araç Ekle</Button>
                </Form.Group>
            </Form>
        </div>
    )
}