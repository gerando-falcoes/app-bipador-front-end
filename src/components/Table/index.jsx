import React from "react";
import PropTypes from "prop-types";
import style from "./table.module.css";

const Table = ({ data }) => {
  return (
    <div className={style.table}>
      <div className={style.section}>
        <div className={style.title}>Code</div>
        <div className={style.value}>{data.id}</div>
      </div>
      <div className={style.section}>
        <div className={style.title}>Produto</div>
        <div className={style.value}>{data.nome}</div>
      </div>
      <div className={style.section}>
        <div className={style.title}>Preço</div>
        <div className={style.value}>{data.preco}</div>
      </div>
      <div className={style.section}>
        <div className={style.title}>Quantidade</div>
        <div className={style.value}>{data.quantidade}</div>
      </div>
      <div className={style.section}>
        <div className={style.title}>Deletar</div>
        <div className={style.delete_button}>
          <button
            type="button"
            onClick={data.delete}
            value={data.index}
            className="btn btn-danger"
          >
            <img src="/images/trash.svg" alt="delete icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    nome: PropTypes.string,
    preco: PropTypes.string,
    quantidade: PropTypes.number,
    delet: PropTypes.func,
    index: PropTypes.number,
  }),
};

export default Table;
