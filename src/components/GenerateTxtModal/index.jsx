import { Modal, Button } from "react-bootstrap";
 
const GenerateTxtModal = ({ onShowModal, onHideModal, onConfirmModal, loteIndex, message }) => {
    return (
        <Modal show={onShowModal} onHide={onHideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Gerar arquivo</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-warning mb-0">{message}</div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={onHideModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={() => onConfirmModal(loteIndex)}>
            Gerar arquivo
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
 
export default GenerateTxtModal;