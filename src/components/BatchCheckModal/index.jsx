import { Modal, Button, Table } from 'react-bootstrap'
import style from './BatchCheckModal.module.css'
import { InputGroup, FormControl } from 'react-bootstrap'
import { useState, useEffect, useRef } from 'react'

import { toast } from 'react-toastify'

import api from '../../services/api'

const BatchCheckModal = ({
  onShowModal,
  onHideModal,
  loteContent,
  fetchData,
  loteId,
  currentTotalProducts,
  loteName,
}) => {
  const [amount, setAmount] = useState(1)
  const [code, setCode] = useState('')
  const [checkerContent, setCheckerContent] = useState([])
  /* const [isDisabled, setIsDisabled] = useState(false) */
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
    let invalidAmount = false

    if (!checkerContent.length) {
      toast.error('Adicione pelo menos um produto.')
      return
    }

    checkerContent.forEach(async (produto) => {
      if (produto.quantidade <= 0) {
        invalidAmount = true
        return
      }
    })

    if (!invalidAmount) {
      setIsSaveButtonDisabled(true)
      try {
        await api.patch(`/lotes/content-update/${loteId}`, checkerContent)
        await handleSaveBatchCheck()
        fetchData()
        onHideModal()
      } catch (error) {
        const err = { message: 'Algo deu errado!' }
        toast.error(err.message)
      } finally {
        setIsVerifyButtonDisabled(false)
      }
    } else {
      toast.error('Você possui produto(s) com quantidade inválida.')
      return
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

    checkerContent.forEach((element, index) => {
      const res = loteContent.find((content) => {
        return (
          element.id_produto === content.id_produto && element.quantidade === content.quantidade
        )
      })
      if (!res) {
        toast.warning('Verifique o produto ' + element.id_produto + ' - ' + element.nome, {
          autoClose: false,
        })
        console.log('Confira o produto', element.id_produto, element.nome)
        checkResult = false
      }
    })

    loteContent.forEach((content, index) => {
      const res = checkerContent.find((element) => {
        return content.id_produto === element.id_produto
      })
      if (!res) {
        toast.error(
          'O produto ' +
            content.id_produto +
            ' - ' +
            content.nome +
            ' está no lote salvo mas não está no lote verificador',
          {
            autoClose: false,
          }
        )
      }
    })

    if (loteContent.length === checkerContent.length) {
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

  const formatProductCode = () => {
    const value = Array.from(code)

    if (code.length < 12) {
      for (let i = 0; i < 12 - code.length; i++) {
        value.unshift('0')
      }
    }

    onChangeCode(value.toString().replace(/,/g, ''))

    ref.current.focus()
  }

  const onChangeCode = async (targetValue) => {
    const value = targetValue
    /* setIsDisabled(true) */
    if (!amount || amount <= 0) {
      /* setIsDisabled(false) */
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
            if (item.id_produto === targetValue) {
              items[index].quantidade = Number(items[index].quantidade) + Number(amount)
              const targetItem = items[index]
              items.splice(index, 1)
              items.splice(0, 0, targetItem)
              setCheckerContent(items)
              isNewProduct = false
            }
          })
          isNewProduct && setCheckerContent((dados) => [resp.data, ...dados])
          setCode('')
        })
        .catch((err) => {
          setCode('')
          toast.error('Produto não encontrado.')
        })
        .finally(setAmount(1))
    }
    /* setIsDisabled(false) */
  }

  const handleDelete = (index) => {
    list.splice(index, 1)
    setCheckerContent(list)
  }

  const handleUpdateProductQuantity = (index, quantity) => {
    const checkerContentCopy = [...checkerContent]
    checkerContentCopy[index].quantidade = Math.abs(Number(quantity))
    setCheckerContent(checkerContentCopy)
  }

  let totalProducts = 0

  const ref = useRef(null)

  return (
    <>
      <Modal show={onShowModal} onHide={onHideModal} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Verificação de Bipagem</Modal.Title>
        </Modal.Header>

        <Modal.Body className={style.modalBody}>
          <div className={style.body}>
            <div className={style.containerLoteName}>
              <p className="text-start p-2 m-0">
                <b>LOTE:</b> {loteName}
              </p>
            </div>
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
                  ref={ref}
                  id="code"
                  type="number"
                  placeholder=""
                  value={code}
                  className="shadow-none"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={(e) => {
                    onChangeCode(e.target.value)
                  }}
                  autoFocus
                  /* disabled={isDisabled} */
                />
                <Button
                  variant="primary"
                  onClick={formatProductCode}
                  id="button-addon2"
                  className="shadow-none"
                >
                  Formatar
                </Button>
              </InputGroup>
            </div>
            <Table className="mb-0" bordered>
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
                      <td className="align-middle">
                        <input
                          className={style.quantityInput}
                          min="1"
                          type="number"
                          value={product.quantidade != 0 ? product.quantidade : ''}
                          onChange={(event) =>
                            handleUpdateProductQuantity(index, event.target.value)
                          }
                        />
                      </td>
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
                      <b>Códigos de Produtos: </b>
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
              <Button
                variant="primary"
                onClick={() => onConfirmBatchCheckModal()}
                disabled={isVerifyButtonDisabled}
              >
                Verificar
              </Button>
              <Button
                variant="success"
                onClick={() => handleUpdateBatchContent()}
                disabled={isSaveButtonDisabled}
              >
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
