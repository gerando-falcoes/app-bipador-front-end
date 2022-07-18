import {React, useEffect, useState} from "react";
import { Modal, Button, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import style from "./tableLotes.module.css";
import DownloadButton from "../../assets/downloadButton.svg"
import TxtImage from "../../assets/simbolo-de-arquivo-txt.svg"
import { toast } from 'react-toastify'
import api from '../../services/api'

const TableLotes = ({categoriaId}) => {

  const [lotes, setLotes] = useState([])

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
  
/*   const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false)
  const [productIndex, setProductIndex] = useState('')
  const [productName, setProductName] = useState('')

  const startModal = (index) => {
    setDisplayConfirmationModal(true)
    setProductIndex(index)
    setProductName(posts[index].nome)
  }

  const confirmDelete = (index) => {
    onDelete(index)
    setDisplayConfirmationModal(false)
  }

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  } */

  return (
    <> 
      {lotes.length === 0 ? <p>Esta pasta está vazia.</p> :
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome do lote</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
          {lotes.map((lote, index) => {
            return (
                <tr key={lote.id}>
                  <td>
                    <img
                      className={style.txtFileImage}
                      src={TxtImage}
                      width="20"
                      height="20"
                      alt="Txt file image"
                    />
                    {lote.name}
                  </td>
                  <td className="text-center">
                    <a href={lote.link}>
                      <img
                        className={style.downloadButton}
                        src={DownloadButton}
                        width="20"
                        height="20"
                        alt="Download button image"
                      />
                    </a>
                  </td>
                </tr>             
            )
          })}
          </tbody>
        </Table>
      }
    </>
  );
};

export default TableLotes;
