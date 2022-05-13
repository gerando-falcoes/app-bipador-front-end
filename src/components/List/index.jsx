import PropTypes from 'prop-types'
import Table from 'react-bootstrap/Table'

const Post = ({posts, onDelete}) => {
  let totalProducts = 0;
  return (
    <article>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Code</th>
            <th>Produto</th>
            <th>Preço</th>
            <th>quantidade</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((product, index) => {
            totalProducts += Number(product.quantidade)
            return (   
              <tr>
                <td>{product.id_produto}</td>
                <td>{product.nome}</td>
                <td>{product.preco}</td>
                <td>{product.quantidade}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => onDelete(index)}
                    className="btn btn-danger"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>            
            <td></td>
            <td></td>
            <td></td>
            <td>Total: {totalProducts}</td>
            <td></td>
          </tr>
        </tfoot>
      </Table>

      {/* Definir Classe CSS */}
    </article>
  )
}

Post.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    quantidade: PropTypes.number.isRequired,
  })),

  onDelete: PropTypes.func.isRequired,
}

export default Post
