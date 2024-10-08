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
import AdditionModal from '../AdditionModal'
import GenerateTxtModal from '../GenerateTxtModal'
import BatchCheckModal from '../BatchCheckModal'
import { useCallback } from 'react'

export default function Pagination({ categoryId }) {
  const [lotes, setLotes] = useState([])
  const [value, setValue] = useState('')
  const [isAdditionModalOpen, setIsAdditionModalOpen] = useState(false)
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
      {
        label: <div className="d-flex justify-content-center mr-2">Observação</div>,
        field: 'displayObservation',
        width: 40,
      },
    ],
  })
  const [contentType, setContentType] = useState('')

  async function fetchData() {
    await api
      .get(`/lotes/folder/${categoryId}`)
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

  // FUNÇÕES DO MODAL DE ADIÇÃO

  const handleSave = async () => {
    if (value === '') {
      toast.error('O campo não pode estar vazio.')
      setIsSaveButtonDisabled(false)
      return
    }
    try {
      contentType === 'invoice'
        ? (await api.patch(`/lotes/nota-fiscal/${loteId}/${value}`)) &&
          toast.success('Nota fiscal adicionada com sucesso.')
        : (await api.patch(`/lotes/observation/${loteId}/${value}`)) &&
          toast.success('Observação adicionada com sucesso.')
    } catch (error) {
      const err = { message: 'Algo deu errado!' }
      toast.error(err.message)
    } finally {
      setIsSaveButtonDisabled(false)
      setValue('')
      setContentType('')
      setLoteId('')
    }
  }

  const startAdditionModal = () => {
    setIsAdditionModalOpen(true)
  }

  const onHideAdditionModal = () => {
    setContentType('')
    setIsAdditionModalOpen(false)
  }

  const onChangeValue = (value) => {
    setValue(value)
  }

  const onConfirmSave = async () => {
    setIsSaveButtonDisabled(true)
    await handleSave()
    fetchData()
    onHideAdditionModal()
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
            alt="Arquivo TXT"
          />

          <p className="mb-0">{lote.name}</p>
        </div>
      ),

      name: lote.name,

      verify:
        lote.check == 1 ? (
          <div className="d-flex justify-content-center">
            <img src={CheckMark} width="22" height="22" alt="Verificado" title="Lote verificado" />
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <img
              className={style.buttonsIcon}
              src={CheckButton}
              width="25"
              height="25"
              alt="Verificar"
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
              alt="Baixar"
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
            alt="Gerar arquivo"
            title="Gerar arquivo"
          />
        </div>
      ),

      displayNotaFiscal: lote.notaFiscal ? (
        <div className="d-flex justify-content-center mr-2 custom-max-width" title="Nota Fiscal">
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
              setContentType("invoice")
              startAdditionModal()
            }}
            alt="Adicionar"
            title="Adicionar nota fiscal"
          />
        </div>
      ),

      notaFiscal: lote.notaFiscal,

      displayObservation: lote.observation ? (
        <div className={style.customMaxWidth} title="Observação">
          {lote.observation}
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
              setContentType("observation")
              startAdditionModal()
            }}
            alt="Adicionar"
            title="Adicionar observação"
          />
        </div>
      ),
      observation: lote.observation,
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
      <AdditionModal
        onShowModal={isAdditionModalOpen}
        onHideModal={onHideAdditionModal}
        onConfirmModal={onConfirmSave}
        isSaveButtonDisabled={isSaveButtonDisabled}
        onChangeValue={onChangeValue}
        value={value}
        contentType={contentType}
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
