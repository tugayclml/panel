import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { SketchPicker } from 'react-color';

export default function AddColor() {

    const [name, setName] = useState('')
    const [colorCode, setColorCode] = useState('')

    const createColor = () => {
        axios.post(
            process.env.REACT_APP_API_URL + '/api/color',
            {
                name,
                colorCode,
            }
        ).then(response => {
            if (response.status === 201) {
                setName('')
                setColorCode('')
            }
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
                    <Button variant="success" onClick={createColor}>Yeni Renk Ekle</Button>
                </Form.Group>
            </Form>
        </div>
    )
}