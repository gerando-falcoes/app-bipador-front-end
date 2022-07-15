import React from 'react'
import TableLotes from '../../components/TableLotes'
import { useParams } from "react-router-dom";
import './LotesPage.css'
import Folder from "../../assets/folder.svg"

const LotesPage = () => {
  const { categoriaName, categoriaId } = useParams()

  return (
    <main className="container mt-3">
      <div className="lotesPageContainer">
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