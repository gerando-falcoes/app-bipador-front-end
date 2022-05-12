import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";

const Post = (props) => {
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
          <tr>
            <td>{props.id}</td>
            <td>{props.nome}</td>
            <td>{props.preco}</td>
            <td>{props.quantidade}</td>
            <td>
              <button
                type="button"
                onClick={props.delete}
                value={props.index}
                className="btn btn-danger"
              >
                Deletar
              </button>
            </td>
          </tr>
        </tbody>
      </Table>

      {/* Definir Classe CSS */}
    </article>
  );
};

Post.propTypes = {
  nome: PropTypes.string,
};

export default Post;
