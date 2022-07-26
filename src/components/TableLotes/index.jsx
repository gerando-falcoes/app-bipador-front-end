import React, { useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify'
import api from '../../services/api'
import style from "./tableLotes.module.css";
import DownloadButton from "../../assets/downloadButton.svg"
import TxtImage from "../../assets/simbolo-de-arquivo-txt.svg"
import AddButton from "../../assets/addButton.png"
import PreviewButton from "../../assets/previewButton.svg"
import UpdateLoteModal from '../UpdateModal';

export default function Pagination({categoriaId}) {

  const [lotes, setLotes] = useState([])
  const [isUpdateModalOpen ,setIsUpdateModalOpen] = useState(false)
  const [dataTable, setDataTable] = useState({
    columns: [
      {
        label: <div className="ml-2">Nome do Lote</div>,
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
      {
        label: <div className="d-flex justify-content-center">NF</div>,
        field: 'displayNotaFiscal',
        width: 40,        
      },
    ],
  });

  const startUpdateModal = () => {
    setIsUpdateModalOpen(true)
  }

  const onHideUpdateModal = () => {
    setIsUpdateModalOpen(false)
  }

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
          height="25"
          alt="Txt file image"
          />
        </div>,

        download:
        <a className="d-flex justify-content-center" href={lote.link}>
          <img
            className={style.buttonsIcon}
            src={DownloadButton}
            width="20"
            height="25"
            alt="Download button image"
          />
        </a>,

        displayNotaFiscal:
        lote.notaFiscal ?
          <div className="d-flex justify-content-center">{lote.notaFiscal}</div> 
          : 
          <div className="d-flex justify-content-center" onClick={startUpdateModal}>
            <img
            className={style.buttonsIcon}
            src={AddButton}
            width="25"
            height="25"
            alt="Txt file image"
            />
          </div>,

        notaFiscal: lote.notaFiscal
      }

    ))

    setDataTable(s => ({
      ...s,
      rows: formattedLotes,
    }))

  }, [lotes])




  return (
    <>
      <MDBDataTableV5 infoLabel={["", "-", "de", ""]} noRecordsFoundLabel="Nenhum lote foi encontrado." searchLabel="Procurar" small sortable={false} entriesOptions={[7, 14, 21]} entries={10} displayEntries={false} pagesAmount={4} data={dataTable} searchBottom barReverse striped bordered responsiveSm />
      <UpdateLoteModal 
      onShowModal={isUpdateModalOpen}
      onHideModal={onHideUpdateModal}
      
      />
    </>
    );

}