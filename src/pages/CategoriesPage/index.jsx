import api from '../../services/api'
import { AuthContext } from '../../contexts/auth'
import React, { useContext } from 'react'
import './CategoriesPage.css'
import Folder from "../../assets/folder.svg"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'

const LotesPage = () => {

  const { redirectLotes } = useContext(AuthContext)

  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function fetchData() {
      await api
      .get(`/categorias`)
      .then((resp) => {
        setCategories(resp.data)
      })
      .catch((err) => {
        toast.error('Nenhuma categoria encontrada.')
      })
    }
    fetchData()
  }, [])

  const handleIrParaLotes = (categoryName, categoryId) => {
    redirectLotes(categoryName, categoryId)
  }

  return (
    <main className="container mt-3">
      <div className="categoriesPageContainer">
        <div className="grid">
          {categories.map((category) => {
            return (
              <div key = {category.id} className="item">
                <img
                  className="folderImage"
                  src={Folder}
                  width="120"
                  height="120"
                  alt="Folder"
                  onClick={() => {
                    handleIrParaLotes(category.name, category.id)}
                  }
                />
                <p>{category.name}</p>
              </div>
            )
          }
          )}
        </div>
      </div>
    </main>
  )
}

export default LotesPage