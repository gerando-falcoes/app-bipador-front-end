import { Modal, Button, Table } from "react-bootstrap";
import style from "./save.module.css";
 
const SaveConfirmation = ({ onShowModal, onHideModal, onConfirmModal, posts, isSaveButtonDisabled }) => {
  let totalProducts = 0;  
  return (
      <Modal show={onShowModal} onHide={onHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Relatório de produtos</Modal.Title>
        </Modal.Header>
        
        <Modal.Body><div className={style.scroll}>
          <Table striped bordered>
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
                  <tr>
                    <td >{product.id_produto}</td>
                    <td>{product.nome}</td>
                    <td>{product.preco}</td>
                    <td>{product.quantidade}</td>
                  </tr>
              )
            })}
            </tbody>
            <tfoot>
            <td className={style.footer} colspan="4"><b>Total de Produtos:</b>{totalProducts}</td>
            </tfoot>
          </Table>

        </div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={onHideModal}>
            Editar
          </Button>
          <Button id="save-button" variant="primary" onClick={onConfirmModal} disabled={isSaveButtonDisabled}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
 
export default SaveConfirmation;