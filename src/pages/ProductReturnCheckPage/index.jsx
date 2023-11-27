import { AuthContext } from '../../contexts/auth'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './ProductReturnCheckPage.css'
import ProductFileComparator from '../../components/ProductFileComparator'

const ProductReturnCheckPage = () => {
  return (
    <main className="container mt-3">
      <div className="productReturnCheckPageContainer">
      <h5>Selecione os arquivos clicando nas caixas abaixo:</h5>
      <ProductFileComparator />
      </div>
    </main>
  )
}
export default ProductReturnCheckPage