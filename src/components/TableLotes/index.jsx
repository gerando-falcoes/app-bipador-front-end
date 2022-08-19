import React, { useEffect, useState } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { toast } from 'react-toastify'
import api from '../../services/api'
import style from './TableLotes.module.css'
import DownloadButton from '../../assets/downloadButton.svg'
import TxtImage from '../../assets/simbolo-de-arquivo-txt.svg'
import AddButton from '../../assets/addButton.svg'
import InvoiceAdditionModal from '../InvoiceAdditionModal'
import GenerateTxtModal from '../GenerateTxtModal'

export default function Pagination({ categoriaId }) {
  const [lotes, setLotes] = useState([])
  const [code, setCode] = useState('')
  const [isInvoiceAdditionModalOpen, setIsInvoiceAdditionModalOpen] = useState(false)
  const [isGenerateTxtModalOpen, setIsGenerateTxtModalOpen] = useState(false)
  const [loteIndex, setLoteIndex] = useState('')
  const [loteName, setLoteName] = useState('')
  const [loteId, setLoteId] = useState('')
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false)
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
  })

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
    const formattedLotes = lotes.map((lote, index) => ({
      displayName: <div className="ml-2">{lote.name}</div>,

      name: lote.name,

      tipo: (
        <div className="d-flex justify-content-center">
          <img
            className={style.txtFileImage}
            src={TxtImage}
            width="20"
            height="25"
            alt="Txt file"
          />
        </div>
      ),

      download: lote.link ? (
        <div className="d-flex justify-content-center">
          <a href={lote.link}>
            <img
              className={style.buttonsIcon}
              src={DownloadButton}
              width="20"
              height="25"
              alt="Download button"
            />
          </a>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <img
            className={style.buttonsIcon}
            src={AddButton}
            width="20"
            height="25"
            onClick={() => startGenerateTxtModal(index)}
            alt="add txt file"
          />
        </div>
      ),

      displayNotaFiscal: lote.notaFiscal ? (
        <div className="d-flex justify-content-center">{lote.notaFiscal}</div>
      ) : (
        <div className="d-flex justify-content-center">
          <img
            className={style.buttonsIcon}
            src={AddButton}
            width="20"
            height="25"
            onClick={() => {
              setLoteId(lote.id)
              startInvoiceAdditionModal()
            }}
            alt="add nf file"
          />
        </div>
      ),

      notaFiscal: lote.notaFiscal,
    }))

    setDataTable((s) => ({
      ...s,
      rows: formattedLotes,
    }))
  }, [lotes])

// FUNÇÕES DO MODAL DE CONFIRMAÇÃO PARA GERAR ARQUIVO TXT

  const startGenerateTxtModal = (index) => {
    setLoteIndex(index)
    setLoteName(lotes[index].name)
    setIsGenerateTxtModalOpen(true)
  }

  const onHideGenerateTxtModal = () => {
    setIsGenerateTxtModalOpen(false)
  }

  const onConfirmGenerateTxt = (loteIndex) => {
    handleGenerateTxT(loteIndex)
    onHideGenerateTxtModal()
  }

// FUNÇÕES DO MODAL PARA ADICIONAR NOTA FISCAL AO LOTE

  const startInvoiceAdditionModal = () => {
    setIsInvoiceAdditionModalOpen(true)
  }

  const onHideInvoiceAdditionModal = () => {
    setIsInvoiceAdditionModalOpen(false)
  }

  const onChangeCode = (valueCode) => {
    setCode(valueCode)
  }

  const onConfirmSave = () => {
    handleSave()
    onHideInvoiceAdditionModal()
  }


  const handleSave = async () => {
    if (code === '') {
      toast.error('Insira o código da NF')
      return
    }

    try {
      await api.patch(`/lotes/nota-fiscal/${loteId}/${code}`)
      document.location.reload()
    } catch (error) {
      const err = { message: 'Algo deu errado!' }
      toast.error(err.message)
    } finally {
      setIsSaveButtonDisabled(false)
      setCode('')
    }
  }

  const handleGenerateTxT = async (index) => {
    const user = JSON.parse(localStorage.getItem('user'))

    try {
      await api.patch(
        `/lotes/generate-txt/${lotes[index].id}/${lotes[index].categoriaId}/${lotes[index].name}/${user.email}`,
        lotes[index].content
      )
      document.location.reload()
    } catch (error) {
      const err = { message: 'Algo deu errado!' }
      toast.error(err.message)
    } finally {
      setLoteId('')
    }
  }

  return (
    <>
      <MDBDataTableV5
        infoLabel={['', '-', 'de', '']}
        noRecordsFoundLabel="Nenhum lote foi encontrado."
        searchLabel="Procurar"
        small
        sortable={false}
        entriesOptions={[7, 14, 21]}
        entries={10}
        displayEntries={false}
        pagesAmount={4}
        data={dataTable}
        searchBottom
        barReverse
        striped
        bordered
        responsiveSm
      />
      <InvoiceAdditionModal
        onShowModal={isInvoiceAdditionModalOpen}
        onHideModal={onHideInvoiceAdditionModal}
        onConfirmModal={onConfirmSave}
        isSaveButtonDisabled={isSaveButtonDisabled}
        onChangeCode={onChangeCode}
        code={code}
      />
      <GenerateTxtModal
        onShowModal={isGenerateTxtModalOpen}
        onHideModal={onHideGenerateTxtModal}
        onConfirmModal={onConfirmGenerateTxt}
        loteIndex={loteIndex}
        message={(<p className="text-justify mb-0">Você está gerando um arquivo txt para o lote <b>{loteName}</b>. Ao confirmar, você assume a responsabilidade por ter realizado ou não a verificação do lote.</p>)}
      />     
      
    </>
  )
}
