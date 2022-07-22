import React, { useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify'
import api from '../../services/api'
import style from "./tableLotes.module.css";
import DownloadButton from "../../assets/downloadButton.svg"
import TxtImage from "../../assets/simbolo-de-arquivo-txt.svg"
import 'bootstrap-css-only/css/bootstrap.min.css';
//import 'mdbreact/dist/css/mdb.css';

export default function Pagination({categoriaId}) {

  const [lotes, setLotes] = useState([])
  const [dataTable, setDataTable] = useState({
    columns: [
      {
        label: 'Nome do Lote',
        field: 'displayName',
        width: 180,
        
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: <div className="d-flex justify-content-center">Tipo</div>,
        field: 'tipo',
        width: 40,
        
      },
      {
        label: <div className="d-flex justify-content-center">Download</div>,
        field: 'download',
        width: 40,        
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      await api
      .get(`/lotes/folder/${categoriaId}`)
      .then((resp) => {
        setLotes(resp.data)
      })
      .catch((err) => {
        toast.error('Nenhum lote encontrado.')
      })
    }
    fetchData()
  }, [])
  

  useEffect(() => {

    const formattedLotes = lotes.map((lote) => (
      {
        displayName: <div className="ml-2">{lote.name}</div>,

        name: lote.name,

        tipo: 
        <div className="d-flex justify-content-center">
          <img
          className={style.txtFileImage}
          src={TxtImage}
          width="20"
          height="20"
          alt="Txt file image"
          />
        </div>,

        download:
        <a className="d-flex justify-content-center" href={lote.link}>
          <img
            className={style.downloadButton}
            src={DownloadButton}
            width="20"
            height="20"
            alt="Download button image"
          />
        </a>
      }

    ))

    setDataTable(s => ({
      ...s,
      rows: formattedLotes,
    }))

  }, [lotes])
  


  return <MDBDataTableV5 infoLabel={["", "-", "de", ""]} noRecordsFoundLabel="Nenhum lote foi encontrado." searchLabel="Procurar" small sortable={false} entriesOptions={[7, 14, 21]} entries={10} displayEntries={false} pagesAmount={4} data={dataTable} fullPagination searchBottom barReverse striped bordered responsiveSm />;

}