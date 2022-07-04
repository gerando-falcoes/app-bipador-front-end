import { Modal, Button } from "react-bootstrap";
 
const LogoutModal = ({ onShowModal, onHideModal, onConfirmModal, message }) => {

    return (
      <Modal show={onShowModal} onHide={onHideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">{message}</div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={onHideModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => onConfirmModal()}>
            Fazer Logout
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
 
export default LogoutModal;