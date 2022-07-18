import {React, useContext} from 'react'
import { AuthContext } from '../../contexts/auth'
import TableLotes from '../../components/TableLotes'
import { useParams } from "react-router-dom";
import './LotesPage.css'
import Folder from "../../assets/folder.svg"
import Arrow from "../../assets/arrow.svg"

const LotesPage = () => {
  const { categoriaName, categoriaId } = useParams()

  const { redirectCategorias } = useContext(AuthContext)

  const handleIrParaCategorias = () => {
    redirectCategorias()
  }

  return (
    <main className="container mt-3">
      <div className="lotesPageContainer">

        <div className="backToCategories" onClick={() => handleIrParaCategorias()}>
          <img
            src={Arrow}
            width="15"
            height="15"
            alt="Back arrow image"
          />
          <p className="backToCategoriesText">Voltar</p>
        </div>
        
        <div className="folderTitle">
          <img
            src={Folder}
            width="40"
            height="40"
            alt="Folder image"
          />
          <p className="folderTitleText">{categoriaName}</p>
        </div>
        <TableLotes 
          categoriaId = {categoriaId}
        />
      </div>
    </main>

  )
}

export default LotesPage