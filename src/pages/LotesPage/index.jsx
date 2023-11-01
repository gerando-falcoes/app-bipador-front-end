import {React, useContext} from 'react'
import { AuthContext } from '../../contexts/auth'
import { useParams } from "react-router-dom";
import './LotesPage.css'
import Folder from "../../assets/folder.svg"
import Arrow from "../../assets/arrow.svg"
import TableLotes from '../../components/TableLotes';

const LotesPage = () => {
  const { categoryName, categoryId } = useParams()

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
            alt="Back arrow"
          />
          <p className="backToCategoriesText">Voltar</p>
        </div>
        
        <div className="folderTitle">
          <img
            src={Folder}
            width="40"
            height="40"
            alt="Folder"
          />
          <p className="folderTitleText">{categoryName}</p>
        </div>
        <TableLotes
          categoryId = {categoryId}
        />
      </div>
    </main>

  )
}

export default LotesPage