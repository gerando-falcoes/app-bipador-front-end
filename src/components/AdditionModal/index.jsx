import { Modal, Button } from "react-bootstrap";
import style from "./AdditionModal.module.css";
import { InputGroup, FormControl } from 'react-bootstrap'


const AdditionModal = ({ onShowModal, onHideModal, onConfirmModal, isSaveButtonDisabled, onChangeValue, value, contentType}) => {
  
  const changeCode = (e) => {
    onChangeValue(e.target.value)
  }
  
  return (
      <Modal show={onShowModal} onHide={onHideModal} size="sm" centered>
        <Modal.Header closeButton>
          <Modal.Title>{(`${contentType}` === "invoice") ? "Adicionar Nota Fiscal" : "Adicionar Observação"}</Modal.Title>
        </Modal.Header>
        
        <Modal.Body><div className={style.body}>
            <div className={style.modalInput}>
              <InputGroup className={style.input}>
                <FormControl
                  as={contentType === "invoice" ? "input" : "textarea"}
                  rows = {contentType === "invoice" ? "1" : "3"}
                  maxLength={30}
                  placeholder={(`${contentType}` === "invoice") ? "Número da NF" : "Observação"}
                  value={value}
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
 
export default AdditionModal;