import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { cities } from '../../constants/city';
import { districts } from '../../constants/district';
import Select from 'react-select';
import axios from "axios";

export default function SectionEditModal(props) {
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

    axios.get(
      process.env.REACT_APP_API_URL + `/api/section/${props.id}`
    ).then(response => {
      if (response.status === 200) {
        setSectionName(response.data.sectionName)
        setCity(JSON.parse(response.data.city))
        selectCity(JSON.parse(response.data.city))
        setDistrict(JSON.parse(response.data.district))
        setStreet(response.data.street)
        setDescription(response.data.description)
      }
    }).catch(error => {
      console.log(error)
    })

  }, [props.id])

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

  const edit = () => {
    axios.patch(
      process.env.REACT_APP_API_URL + `/api/section/${props.id}`,
      {
        sectionName,
        city,
        district,
        street,
        description
      }
    ).then(response => {
      if (response.status === 200) {
        props.onHide()
      }
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: '#282c34' }}>
        <Modal.Title id="contained-modal-title-vcenter" style={{ color: 'white' }}>
          Aracı Düzenle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#282c34' }}>
        <Form style={{
          color: 'white',
          textAlign: 'start',
          alignItems: 'center',
        }}>
          <Form.Group className="mb-3">
            <Form.Label>Bölge Adı</Form.Label>
            <Form.Control type="text" placeholder="Bölge adı" value={sectionName} onChange={(e) => setSectionName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>İl</Form.Label>
            <Select options={cityOptions}
              value={cityOptions.filter(option => option.value === city.value)}
              onChange={(choice) => selectCity(choice)} color='black'
              styles={customStyles}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>İlçe</Form.Label>
            <Select options={districtOptions}
              value={districtOptions.filter(option => option.value === district.value)}
              onChange={(choice) => setDistrict(choice)} color='black'
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

        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#282c34' }}>
        <Button variant='secondary' onClick={props.onHide}>Kapat</Button>
        <Button variant='success' onClick={edit}>Düzenle</Button>
      </Modal.Footer>
    </Modal>
  )
}