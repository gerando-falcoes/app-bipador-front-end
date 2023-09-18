import React, { useEffect, useState } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { toast } from 'react-toastify'
import api from '../../services/api'
import style from './tableLotes.module.css'
import DownloadButton from '../../assets/downloadButton.svg'
import TxtImage from '../../assets/simbolo-de-arquivo-txt.svg'
import AddButton from '../../assets/addButton.svg'
import CheckButton from '../../assets/lista-de-verificacao2.png'
import CheckMark from '../../assets/check-mark.png'
import InvoiceAdditionModal from '../InvoiceAdditionModal'
import GenerateTxtModal from '../GenerateTxtModal'
import BatchCheckModal from '../BatchCheckModal'
import { useCallback } from 'react'

export default function Pagination({ categoriaId }) {
  const [lotes, setLotes] = useState([])
  const [code, setCode] = useState('')
  const [isInvoiceAdditionModalOpen, setIsInvoiceAdditionModalOpen] = useState(false)
  const [isBatchCheckModalOpen, setIsBatchCheckModalOpen] = useState(false)
  const [isGenerateTxtModalOpen, setIsGenerateTxtModalOpen] = useState(false)
  const [loteIndex, setLoteIndex] = useState('')
  const [loteName, setLoteName] = useState('')
  const [loteId, setLoteId] = useState('')
  const [loteContent, setLoteContent] = useState('')
  const [currentTotalProducts, setCurrentTotalProducts] = useState(0)
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
        label: <div className="d-flex justify-content-center">Verificação</div>,
        field: 'verify',
        width: 40,
      },
      {
        label: <div className="d-flex justify-content-center">Download</div>,
        field: 'download',
        width: 40,
      },
      {
        label: <div className="d-flex justify-content-center mr-2">NF</div>,
        field: 'displayNotaFiscal',
        width: 40,
      },
    ],
  })

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

  useEffect(() => {
    fetchData()
  }, [])



  //FUNÇÕES DO MODAL DE VERIFICAÇÃO DE LOTE

  const startVerificationModal = (checkerUser, content, loteName) => {

    setLoteName(loteName)

    let sumTotalProducts = 0

    if (checkerUser) {
      const user = checkerUser.split('@')
      return toast.error('Lote já possui um arquivo gerado pelo usuário ' + user[0] + '.') 
    }

    if (!content) {
      return toast.error('Lote não possui verificação disponível.')
    }

    content.forEach((product) => {
      sumTotalProducts += Number(product.quantidade)
    })
    setCurrentTotalProducts(sumTotalProducts)
    setLoteContent(content)
    setIsBatchCheckModalOpen(true)
  }

  const onHideBatchCheckModal = () => {
    setIsBatchCheckModalOpen(false)
  }

  // FUNÇÕES DO MODAL DE CONFIRMAÇÃO PARA GERAR ARQUIVO TXT

  const handleGenerateTxt = async (index) => {
    const user = JSON.parse(localStorage.getItem('user'))
    try {
      await api.patch(
        `/lotes/generate-txt/${lotes[index].id}/${lotes[index].categoriaId}/${lotes[index].name}/${user.email}`,
        lotes[index].content
      )
      toast.success('Arquivo gerado com sucesso.')
    } catch (error) {
      const err = { message: 'Algo deu errado!' }
      toast.error(err.message)
    } finally {
      setLoteIndex('')
    }
  }

  const startGenerateTxtModal = useCallback(
    (index) => {
      setLoteIndex(index)
      setLoteName(lotes[index].name)
      setIsGenerateTxtModalOpen(true)
    },
    [lotes]
  )

  const onHideGenerateTxtModal = () => {
    setIsGenerateTxtModalOpen(false)
  }

  const onConfirmGenerateTxt = async (loteIndex) => {
    await handleGenerateTxt(loteIndex)
    fetchData()
    onHideGenerateTxtModal()
  }

  // FUNÇÕES DO MODAL PARA ADICIONAR NOTA FISCAL AO LOTE

  const handleSave = async () => {
    if (code === '') {
      toast.error('Insira o código da NF')
      return
    }

    try {
      await api.patch(`/lotes/nota-fiscal/${loteId}/${code}`)
      toast.success('Nota fiscal adicionada com sucesso.')
    } catch (error) {
      const err = { message: 'Algo deu errado!' }
      toast.error(err.message)
    } finally {
      setIsSaveButtonDisabled(false)
      setCode('')
      setLoteId('')
    }
  }


  const startInvoiceAdditionModal = () => {
    setIsInvoiceAdditionModalOpen(true)
  }

  const onHideInvoiceAdditionModal = () => {
    setIsInvoiceAdditionModalOpen(false)
  }

  const onChangeCode = (valueCode) => {
    setCode(valueCode)
  }

  const onConfirmSave = async () => {
    setIsSaveButtonDisabled(true)
    await handleSave()
    fetchData()
    onHideInvoiceAdditionModal()
  }

  useEffect(() => {
    const formattedLotes = lotes.map((lote, index) => ({
      displayName: (
        <div className="d-flex align-items-center ml-2 gap-2">
          <img
            className={style.txtFileImage}
            src={TxtImage}
            width="20"
            height="25"
            alt="Txt file"
          />

          <p className="mb-0">{lote.name}</p>
        </div>
      ),

      name: lote.name,

      verify:
        lote.check == 1 ? (
          <div className="d-flex justify-content-center">
            <img
              src={CheckMark}
              width="22"
              height="22"
              alt="Check mark"
              title="Lote verificado"
            />
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <img
              className={style.buttonsIcon}
              src={CheckButton}
              width="25"
              height="25"
              alt="Check button"
              title="Verificar lote"
              onClick={() => {
                setLoteId(lote.id)
                startVerificationModal(lote.checkerUser, lote.content, lote.name)
              }}
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
              title="Baixar"
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
            title="Gerar arquivo"
          />
        </div>
      ),

      displayNotaFiscal: lote.notaFiscal ? (
        <div className="d-flex justify-content-center mr-2" title="Nota Fiscal">
          {lote.notaFiscal}
        </div>
      ) : (
        <div className="d-flex justify-content-center mr-2">
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
            title="Adicionar nota fiscal"
          />
        </div>
      ),

      notaFiscal: lote.notaFiscal,
    }))

    setDataTable((s) => ({
      ...s,
      rows: formattedLotes,
    }))
  }, [lotes, startGenerateTxtModal])

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
        message={
          <p className="text-justify mb-0">
            Você está gerando um arquivo txt para o lote <b>{loteName}</b>. Ao confirmar, você
            assume a responsabilidade por ter realizado ou não a verificação do lote.
          </p>
        }
      />
      <BatchCheckModal
        onShowModal={isBatchCheckModalOpen}
        onHideModal={onHideBatchCheckModal}
        loteContent={loteContent}
        fetchData={fetchData}
        loteId={loteId}
        currentTotalProducts={currentTotalProducts}
        loteName={loteName}
      />
    </>
  )
}
