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
      <ProductFileComparator />
      </div>
    </main>
  )
}
export default ProductReturnCheckPage