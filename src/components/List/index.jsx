import PropTypes from "prop-types";
// import Button from '../Button'
// import coracaoImg from '../../assets/coracao.svg'
// import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
// import '../List/List.css'

const Post = (props) => {
  // const data = new Date(props.data).toLocaleDateString();

  return (
    <article>
      <div className="caixa">{/* <span>{data}</span> */}</div>
      {
        // data ?
        //   <div>
        //     <h3 className="nome">{props.nome}</h3>
        //     <p>codigo de barra {props.id}</p>
        //     <p>quantidade: {props.quantidade}</p>
        //     <p>preço: {props.preco}</p>
        //   </div> : data
      }
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>Code</th>
            <th>Produto</th>
            <th>Preço</th>
            <th>Quantidade</th>
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
                onClick={props.delet}
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
