import axios from "axios";
import { Button, Modal } from "react-bootstrap";

export default function DeleteModal(props) {

  const deleteItem = () => {
    switch (props.type) {
      case 'price': {
        axios.delete(
          `http://localhost:5000/api/price/${props.id}`
        ).then(response => {
          if (response.status === 200) {
            props.onHide()
          }
        }).catch(error => {
          console.log(error);
        })
        break;
      }

      case 'car': {
        axios.delete(
          `http://localhost:5000/api/car/${props.id}`
        ).then(response => {
          if (response.status === 200) {
            props.onHide()
          }
        }).catch(error => {
          console.log(error)
        })
        break;
      }

      case 'section': {
        axios.delete(
          `http://localhost:5000/api/section/${props.id}`,
        ).then(response => {
          if (response.status === 200) {
            props.onHide()
          }
        }).catch(error => {
          console.log(error)
        })
        break;
      }

      case 'reservation': {
        axios.delete(
          `http://localhost:5000/api/reservation/${props.id}`,
        ).then(response => {
          if (response.status === 200) {
            props.onHide()
          }
        }).catch(error => {
          console.log(error)
        })
        break;
      }

      case 'agent': {
        axios.delete(
          `http://localhost:5000/api/agent/${props.id}`,
        ).then(response => {
          if (response.status === 200) {
            props.onHide()
          }
        }).catch(error => {
          console.log(error)
        })
        break;
      }

      case 'employee': {
        axios.delete(
          `http://localhost:5000/api/employee/${props.id}`,
        ).then(response => {
          if (response.status === 200) {
            props.onHide()
          }
        }).catch(error => {
          console.log(error)
        })
        break;
      }

      case 'carDriver': {
        const employeeIds = props.driverIds.map(driver => { return driver.id })
        axios.patch(
          `http://localhost:5000/api/car/${props.id}`,
          {
            employeeIds: employeeIds
          }
        ).then(response => {
          if (response.status === 200) {
            props.onHide()
          }
        }).catch(error => {
          console.log(error)
        })
        break;
      }

      case 'color': {
        axios.delete(
          `http://localhost:5000/api/color/${props.id}`,
        ).then(response => {
          if (response.status === 200) {
            props.onHide()
          }
        }).catch(error => {
          console.log(error)
        })
        break;
      }

      default:
        break;
    }

  }
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: '#282c34' }}>
        <Modal.Title id="contained-modal-title-vcenter" style={{ color: 'white' }}>
          Uyarı
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#282c34' }}>
        <p style={{ fontSize: 20, color: 'white' }}>Silmek istediğinize emin misiniz?</p>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#282c34' }}>
        <Button variant='secondary' onClick={props.onHide}>Kapat</Button>
        <Button variant='danger' onClick={deleteItem}>Sil</Button>
      </Modal.Footer>
    </Modal>
  )
}