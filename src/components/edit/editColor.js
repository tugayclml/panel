import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { SketchPicker } from 'react-color';
import { useLocation } from "react-router-dom";

export default function EditColor() {

    const location = useLocation()

    const [name, setName] = useState('')
    const [colorCode, setColorCode] = useState('')

    useEffect(() => {
        getColor()
    }, [])

    const getColor = () => {
        axios.get(
            `http://localhost:5000/api/color/${location.state.colorId}`,
        ).then(response => {
            if (response.status === 200) {
                setName(response.data.name)
                setColorCode(response.data.colorCode)
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const editColor = () => {
        axios.patch(
            `http://localhost:5000/api/color/${location.state.colorId}`,
            {
                name,
                colorCode,
            }
        ).then(response => {
            if (response.status === 200) {

            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="App">
            <h2 style={{ color: 'white', paddingTop: 10, paddingBottom: 10 }}>Renk Ekleme</h2>
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
                    <Form.Label>İsim</Form.Label>
                    <Form.Control type="text" value={name} placeholder="Ad" onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Renk</Form.Label>
                    <SketchPicker
                        color={colorCode}
                        onChangeComplete={(color) => setColorCode(color.hex)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Button variant="success" onClick={editColor}>Renk Güncelle</Button>
                </Form.Group>
            </Form>
        </div>
    )
}