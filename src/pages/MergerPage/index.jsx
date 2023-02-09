import { AuthContext } from '../../contexts/auth'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './MergerPage.css'
import FileUploader from "../../components/MergerText/index";

const MergerPage = () => {
  return (
    <main className="container mt-3">
      <div className="mergerPageContainer">
      <h5>Clique na caixa abaixo para selecionar os arquivos:</h5>
      <FileUploader />
      </div>
    </main>
  )
}
export default MergerPage