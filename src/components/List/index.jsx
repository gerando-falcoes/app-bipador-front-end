import PropTypes from "prop-types";
import Table from "../Table";
import "../List/List.css";

const Post = (props) => {
  return (
    <article className="list">
      <Table data={props} />
    </article>
  );
};

Post.propTypes = {
  id: PropTypes.string,
  nome: PropTypes.string,
  preco: PropTypes.string,
  quantidade: PropTypes.number,
  delete: PropTypes.func,
  index: PropTypes.number,
};

export default Post;
