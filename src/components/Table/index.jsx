import React from 'react'
import PropTypes from 'prop-types'
import style from './table.module.css'

const Table = ({ posts, onDelete }) => {
  let totalProducts = 0
  return (
    <>
      {posts.map((product, index) => {
        totalProducts += Number(product.quantidade)
        return (
          <div className={style.table} key={product.id_produto}>
            <div className={style.section}>
              <div className={style.title}>Code</div>
              <div className={style.value}>{product.id_produto}</div>
            </div>
            <div className={style.section}>
              <div className={style.title}>Produto</div>
              <div className={style.value}>{product.nome}</div>
            </div>
            <div className={style.section}>
              <div className={style.title}>Preço</div>
              <div className={style.value}>{product.preco}</div>
            </div>
            <div className={style.section}>
              <div className={style.title}>Numero Lote</div>
              <div className={style.value}>{product?.numero_lote}</div>
            </div>
            <div className={style.section}>
              <div className={style.title}>Quantidade</div>
              <div className={style.value}>{product.quantidade}</div>
            </div>
            <div className={style.section}>
              <div className={style.title}>Deletar</div>
              <div className={style.delete_button}>
                <button type="button" onClick={() => onDelete(index)} className="btn btn-danger">
                  <img src="/images/trash.svg" alt="delete icon" />
                </button>
              </div>
            </div>
          </div>
        )
      })}
      <div className={style.table}>
        <div className={style.section}>
          <div className={`${style.total_products} text-center`}>
            Total de Produtos: {totalProducts}
          </div>
        </div>
      </div>
    </>
  )
}

Table.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id_produto: PropTypes.string.isRequired,
      nome: PropTypes.string.isRequired,
      preco: PropTypes.number.isRequired,
      quantidade: PropTypes.number.isRequired,
      numero_lote: PropTypes.string,
    })
  ),

  onDelete: PropTypes.func.isRequired,
}

export default Table
