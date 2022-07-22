import { Modal, Button, Table } from "react-bootstrap";
import style from "./save.module.css";
import { InputGroup, FormControl } from 'react-bootstrap'


const SaveConfirmation = ({ onShowModal, onHideModal, onConfirmModal, posts, isSaveButtonDisabled, onChangeNote, note }) => {
  
  let totalProducts = 0;  
  
  const changeNote = (e) => {
    onChangeNote(e.target.value)

  }
  
  return (
      <Modal show={onShowModal} onHide={onHideModal} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Relatório de produtos</Modal.Title>
        </Modal.Header>
        
        <Modal.Body><div className={style.body}>
          <Table bordered>
            <thead>
              <tr>
                <th>Cod.</th>
                <th>Prod.</th>
                <th>Val.</th>
                <th>Qtd.</th>
              </tr>
            </thead>
            <tbody>
            {posts.map((product) => {
              totalProducts += Number(product.quantidade)
              return (
                  <tr key={product.id_produto}>
                    <td>{product.id_produto}</td>
                    <td>{product.nome}</td>
                    <td>{product.preco}</td>
                    <td>{product.quantidade}</td>
                  </tr>
              )
            })}
            </tbody>
            <tfoot>
            <tr>
              <td className={style.tableFooter} colSpan="4"><b>Total de Produtos: </b>{totalProducts}</td>
            </tr>
            </tfoot>
          </Table>

        </div></Modal.Body>
        <Modal.Footer><div className={style.modalFooter}>
            <div className={style.modalInput}>
              <InputGroup className={style.input}>
                <FormControl
                  type="text"
                  placeholder="Observação do lote"
                  value={note}
                  onChange={changeNote}
                />
              </InputGroup>
            </div>
            <div className={style.modalButtons}>
              <Button variant="default" onClick={onHideModal}>
                Editar
              </Button>
              <Button variant="primary" onClick={onConfirmModal} disabled={isSaveButtonDisabled}>
                Salvar
              </Button>
            </div>
          
          </div></Modal.Footer>
      </Modal>
    )
}
 
export default SaveConfirmation;