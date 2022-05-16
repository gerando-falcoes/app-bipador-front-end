import PropTypes from "prop-types";
import Table from "../Table";
import "../List/List.css";

const Post = ({posts, onDelete}) => {
  return (
    <article className="list">
      <Table 
        posts={posts}
        onDelete={onDelete}
      />
    </article>
  )
}

Post.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id_produto: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    preco: PropTypes.string.isRequired,
    quantidade: PropTypes.number.isRequired,
  })),

  onDelete: PropTypes.func.isRequired,

};

export default Post
