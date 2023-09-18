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

  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    async function fetchData() {
      await api
      .get(`/categorias`)
      .then((resp) => {
        setCategorias(resp.data)
      })
      .catch((err) => {
        toast.error('Nenhuma categoria encontrada.')
      })
    }
    fetchData()
  }, [])

  const handleIrParaLotes = (categoriaName, categoriaId) => {
    redirectLotes(categoriaName, categoriaId)
  }

  return (
    <main className="container mt-3">
      <div className="categoriesPageContainer">
        <div className="grid">
          {categorias.map((categoria) => {
            return (
              <div key = {categoria.id} className="item">
                <img
                  className="folderImage"
                  src={Folder}
                  width="120"
                  height="120"
                  alt="Folder image"
                  onClick={() => {
                    handleIrParaLotes(categoria.name, categoria.id)}
                  }
                />
                <p>{categoria.name}</p>
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