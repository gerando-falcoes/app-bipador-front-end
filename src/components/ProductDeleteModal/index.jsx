import { Modal, Button } from "react-bootstrap";
 
const ProductDeleteModal = ({ showModal, hideModal, confirmModal, index, message }) => {
    return (
        <Modal show={showModal} onHide={hideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">{message}</div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={hideModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => confirmModal(index)}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
 
export default ProductDeleteModal;