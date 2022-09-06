import { Modal, Button, Table } from 'react-bootstrap'
import style from './BatchCheckModal.module.css'
import { InputGroup, FormControl } from 'react-bootstrap'
import { useState, useEffect } from 'react'

import { toast } from 'react-toastify'

import api from '../../services/api'

const BatchCheckModal = ({ onShowModal, onHideModal, loteContent, fetchData, loteId, currentTotalProducts}) => {
  const [amount, setAmount] = useState(1)
  const [code, setCode] = useState('')
  const [checkerContent, setCheckerContent] = useState([])
  const [isDisabled, setIsDisabled] = useState(false)
  const [isVerifyButtonDisabled, setIsVerifyButtonDisabled] = useState()
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true)


  useEffect(() => {
    const recovereContent = localStorage.getItem('CheckerContent')

    if (recovereContent) {
      setCheckerContent(JSON.parse(recovereContent))
    }
  }, [])
  const list = [...checkerContent]

  useEffect(() => {
    localStorage.setItem('CheckerContent', JSON.stringify(checkerContent))
  }, [checkerContent])


  const handleUpdateBatchContent = async () => {

    setIsSaveButtonDisabled(true)

    try {
      await api.patch(`/lotes/content-update/${loteId}`, checkerContent)
      await handleSaveBatchCheck()
      fetchData()
      onHideModal()
    } catch (error) {
      const err = { message: 'Algo deu errado!'}
      toast.error(err.message)
    } finally {
      setIsVerifyButtonDisabled(false)
    }
  }


  const handleSaveBatchCheck = async () => {
    try {
      await api.patch(`/lotes/lote-check/${loteId}/true`)
      toast.success('Verificação realizada com sucesso. O arquivo pode ser gerado.')
      setCheckerContent([])
    } catch (error) {
      const err = { message: 'Algo deu errado!' }
      toast.error(err.message)
    } finally {
      setIsVerifyButtonDisabled(false)
    }
  }

  const onConfirmBatchCheckModal = async () => {
    let checkResult = true

    if (!checkerContent.length) {
      return toast.error('Adicione pelo menos um produto para realizar a verificação.')
    }
    
    if (loteContent.length === checkerContent.length) {
      checkerContent.forEach((element, index) => {
        const res = loteContent.find((content) => {
          return (element.id_produto === content.id_produto && element.quantidade === content.quantidade)
        })
        console.log("RESULTADO", res, element.id_produto)
        if (!res) checkResult = false

      })
  
      if (checkResult) {
        setIsVerifyButtonDisabled(true)
        await handleSaveBatchCheck()
        fetchData()
        onHideModal()
      } else {
        setIsSaveButtonDisabled(false)
        toast.error('Verificação falhou.')
      }
    } else {
      setIsSaveButtonDisabled(false)
      toast.error('Verificação falhou.')
    }

  }


  const onChangeCode = async (e) => {
    const value = e.target.value
    setIsDisabled(true)
    if (!amount || amount <= 0) {
      setIsDisabled(false)
      setCode('')
      toast.error('Insira a quantidade primeiro.')
      return
    }
    setCode(value)

    if (value?.length === 12) {

      await api
        .get(`/produtos/${value}`)
        .then((resp) => {
          const alterarQuantidade = resp.data
          let isNewProduct = true
          alterarQuantidade.quantidade = amount
          const items = JSON.parse(localStorage.getItem('CheckerContent') || '')
          items.map((item, index) => {
            if (item.id_produto === e.target.value) {
              items[index].quantidade = Number(items[index].quantidade) + Number(amount)
              setCheckerContent(items)
              isNewProduct = false
            }
          })
          isNewProduct && setCheckerContent((dados) => [...dados, resp.data])
          setCode('')
        })
        .catch((err) => {
          setCode('')
          toast.error('Produto não encontrado.')
        })
    }
    setIsDisabled(false)
  }

  const handleDelete = (index) => {
    list.splice(index, 1)
    setCheckerContent(list)
  }

  let totalProducts = 0

  return (
    <>
      <Modal show={onShowModal} onHide={onHideModal} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Verificação de Bipagem</Modal.Title>
        </Modal.Header>

        <Modal.Body className={style.modalBody}>
          <div className={style.body}>
            <div>
              <label>Quantidade</label>
              <InputGroup className="mb-3">
                <FormControl
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => {
                    let value = e.target.value
                    setAmount(() => {
                      if (!!value && Math.abs(value) > 0) {
                        return Math.abs(value)
                      } else if (!!value && Math.abs(value) === 0) {
                        return (value = 1)
                      } else return null
                    })
                  }}
                  className="shadow-none"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
              <label>Código do Produto</label>
              <InputGroup className="mb-3">
                <FormControl
                  id="code"
                  type="number"
                  placeholder=""
                  value={code}
                  className="shadow-none"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={onChangeCode}
                  disabled={isDisabled}
                />
              </InputGroup>
            </div>
            <Table bordered>
              <thead>
                <tr>
                  <th>Cod.</th>
                  <th>Prod.</th>
                  <th>Qtd.</th>
                  <th>Del.</th>
                </tr>
              </thead>
              <tbody>
                {checkerContent.map((product, index) => {
                  totalProducts += Number(product.quantidade)
                  return (
                    <tr key={product.id_produto}>
                      <td className="align-middle">{product.id_produto}</td>
                      <td className="align-middle">{product.nome}</td>
                      <td className="align-middle">{product.quantidade}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleDelete(index)}
                          className="btn btn-danger"
                        >
                          <img src="/images/trash.svg" alt="delete icon" width="20" height="20" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td className={style.tableFooter} colSpan="4">
                    <p className="mb-0">
                      <b>Tipos de Produtos: </b>
                      Lote salvo: {loteContent.length} | Lote atual: {checkerContent.length}

                    </p>
                  </td>
                </tr>
                <tr>
                  <td className={style.tableFooter} colSpan="4">
                    <p className="mb-0">
                      <b>Total de Produtos: </b>
                      Lote salvo: {currentTotalProducts} | Lote atual: {totalProducts}
                    </p>
                  </td>
                </tr>
              </tfoot>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className={style.modalFooter}>
            <div className={style.modalButtons}>
              <Button variant="default" onClick={onHideModal}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => onConfirmBatchCheckModal()} disabled={isVerifyButtonDisabled}>
                Verificar
              </Button>
              <Button variant="success" onClick={() => handleUpdateBatchContent()} disabled={isSaveButtonDisabled}>
                Salvar
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default BatchCheckModal
