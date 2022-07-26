import { Modal, Button, Table } from "react-bootstrap";
import style from "./updateModal.module.css";
import { InputGroup, FormControl } from 'react-bootstrap'


const UpdateLoteModal = ({ onShowModal, onHideModal, onConfirmModal, isSaveButtonDisabled }) => {
  
  let totalProducts = 0;  
  
  const changeNote = (e) => {
    

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
/*                   value={note}
                  onChange={changeNote} */
                />
              </InputGroup>
            </div>
        </div></Modal.Body>

        <Modal.Footer><div className={style.modalFooter}>
            <div className={style.modalButtons}>
              <Button variant="default" onClick={onHideModal}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={onConfirmModal} disabled={isSaveButtonDisabled}>
                Salvar
              </Button>
            </div>
          
          </div></Modal.Footer>
      </Modal>
    )
}
 
export default UpdateLoteModal;