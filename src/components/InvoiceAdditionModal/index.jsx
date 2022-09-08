import { Modal, Button } from "react-bootstrap";
import style from "./InvoiceAdditionModal.module.css";
import { InputGroup, FormControl } from 'react-bootstrap'


const InvoiceAdditionModal = ({ onShowModal, onHideModal, onConfirmModal, isSaveButtonDisabled, onChangeCode, code }) => {
  
  const changeCode = (e) => {
    onChangeCode(e.target.value)
  }
  
  return (
      <Modal show={onShowModal} onHide={onHideModal} size="sm" centered>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Nota Fiscal</Modal.Title>
        </Modal.Header>
        
        <Modal.Body><div className={style.body}>
            <div className={style.modalInput}>
              <InputGroup className={style.input}>
                <FormControl
                  type="text"
                  placeholder="Número da NF"
                  value={code}
                  onChange={changeCode}
                />
              </InputGroup>
            </div>
        </div></Modal.Body>

        <Modal.Footer><div className={style.modalFooter}>
            <div className={style.modalButtons}>
              <Button variant="default" onClick={onHideModal}>
                Cancelar
              </Button>
              <Button variant="success" onClick={onConfirmModal} disabled={isSaveButtonDisabled}>
                Salvar
              </Button>
            </div>
          
          </div></Modal.Footer>
      </Modal>
    )
}
 
export default InvoiceAdditionModal;