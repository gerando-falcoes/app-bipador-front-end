import { React, useState } from 'react'
import PropTypes from 'prop-types'
import style from './table.module.css'
import ProductDeleteModal from '../ProductDeleteModal'

const Table = ({ posts, onDelete, handleUpdateProductQuantity }) => {
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false)
  const [productIndex, setProductIndex] = useState('')
  const [productName, setProductName] = useState('')

  const startModal = (index) => {
    setProductIndex(index)
    setProductName(posts[index].nome)
    setDisplayConfirmationModal(true)
  }

  const confirmDelete = (index) => {
    onDelete(index)
    setDisplayConfirmationModal(false)
  }

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false)
  }

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
              <div className={style.title}>Quantidade</div>
              <div className={style.value}>
                <input
                  min="1"
                  type="number"
                  className={style.quantityInput}
                  value={product.quantidade != 0 ? product.quantidade : ''}
                  onChange={(event) => handleUpdateProductQuantity(index, event.target.value)}
                />
              </div>
            </div>
            <div className={style.section}>
              <div className={style.title}>Setor</div>
              <div className={style.value}>{product.setor.name}</div>
            </div>
            <div className={style.section}>
              <div className={style.title}>Preço</div>
              <div className={style.value}>{product.preco}</div>
            </div>
            <div className={style.section}>
              <div className={style.title}>Deletar</div>
              <div className={style.delete_button}>
                <button type="button" onClick={() => startModal(index)} className="btn btn-danger">
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
      <ProductDeleteModal
        showModal={displayConfirmationModal}
        confirmModal={confirmDelete}
        hideModal={hideConfirmationModal}
        index={productIndex}
        message={
          <p className="text-justify mb-0">
            Você está excluindo o produto <b>{productName}</b>. Tem certeza?
          </p>
        }
      />
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
    })
  ),

  onDelete: PropTypes.func.isRequired,
}

export default Table
