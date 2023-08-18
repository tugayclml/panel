import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { cities } from '../../constants/city';
import { districts } from '../../constants/district';
import axios from 'axios';


export default function AddSection() {
    const [sectionName, setSectionName] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [street, setStreet] = useState('')
    const [description, setDescription] = useState('')

    const [cityOptions, setCityOptions] = useState([])
    const [districtOptions, setDistrictOptions] = useState([])

    useEffect(() => {
        const cityOptions = []
        for (const city of cities.data) {
            cityOptions.push({ value: city.sehir_key, label: city.sehir_title })
        }
        setCityOptions(cityOptions)
    }, [])

    const createSection = () => {
        axios.post(
            process.env.REACT_APP_API_URL + '/api/section',
            {
                sectionName,
                city,
                district,
                street,
                description
            }
        ).then(response => {
            if (response.data && response.status === 201) {
                setSectionName('')
                setCity('')
                setDistrict('')
                setStreet('')
                setDescription('')
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const selectCity = (choice) => {
        setCity(choice)
        const districtOption = []
        for (const district of districts.data) {
            if (choice.value === district.ilce_sehirkey) {
                districtOption.push({ value: district.ilce_key, label: district.ilce_title })
            }
        }
        setDistrictOptions(districtOption)
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
            <h2 style={{ color: 'white', paddingTop: 10, paddingBottom: 10 }}>Bölgeler Ekle</h2>
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
                    <Form.Label>Bölge Adı</Form.Label>
                    <Form.Control type="text" placeholder="Bölge adı" value={sectionName} onChange={(e) => setSectionName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>İl</Form.Label>
                    <Select options={cityOptions} onChange={(choice) => selectCity(choice)} color='black'
                        styles={customStyles}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>İlçe</Form.Label>
                    <Select options={districtOptions} onChange={(choice) => setDistrict(choice)} color='black'
                        styles={customStyles}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Semt</Form.Label>
                    <Form.Control type="text" placeholder="Semt" value={street} onChange={(e) => setStreet(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Açıklama</Form.Label>
                    <Form.Control as="textarea" placeholder='Adres açıklaması' value={description} rows={3} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Button variant="success" onClick={createSection}>Yeni Bölge Oluştur</Button>
                </Form.Group>
            </Form>
        </div>
    )
}