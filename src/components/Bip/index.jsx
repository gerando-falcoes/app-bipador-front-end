import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import api from '../../services/api'
import Post from '../List'
import './Bip.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { InputGroup, Button, FormControl } from 'react-bootstrap'
import BatchSaveModal from '../BatchSaveModal'

const Bip = () => {
  const [amount, setAmount] = useState(1)
  const [code, setCode] = useState('')

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false)
  const [posts, setPosts] = useState([])
  const [note, setNote] = useState('')

  const local = JSON.parse(localStorage.getItem('user'))

  const formatProductCode = () => {
    const value = Array.from(code)

    if (code.length < 12) {
      for (let i = 0; i < 12 - code.length; i++) {
        value.unshift('0')
      }
    }

    handleBarCodeChange(value.toString().replace(/,/g, ''))

    ref.current.focus()
  }

  const unidade = local.categoryId

  const onChangeNote = (valueNote) => {
    setNote(valueNote)
  }

  const handleUpdateProductQuantity = (index, quantity) => {
    let value = quantity
    const postsCopy = [...posts]
    postsCopy[index].quantidade = Math.abs(Number(value))

    setPosts(postsCopy)
  }

  const startSaveModal = () => {
    if (!posts.length) {
      toast.error('Adicione pelo menos um produto.')
      return
    }

    posts.forEach((produto) => {
      if (produto.quantidade <= 0) {
        toast.error('Você possui produto(s) com quantidade inválida.')
        return
      } else setIsSaveModalOpen(true)
    })
  }

  const onHideSaveModal = () => {
    setIsSaveModalOpen(false)
  }

  const onConfirmSave = () => {
    handleSave()
    onHideSaveModal()
  }

  useEffect(() => {
    const recoverePost = localStorage.getItem('Produto')

    if (recoverePost) {
      setPosts(JSON.parse(recoverePost))
    }
  }, [])
  const list = [...posts]

  useEffect(() => {
    localStorage.setItem('Produto', JSON.stringify(posts))
  }, [posts])

  
  const handleEnterKeyDown = (event) => {
    let value
    if (event.key === 'Enter' && code.length < 12) {
      value = Array.from(code)
      for (let i = 0; i < 12 - code.length; i++) {
        value.unshift('0')
      }
      value = value.toString().replace(/,/g, '')
      setCode(value)
      handleBarCodeChange(value)
    }
  };

  const handleBarCodeChange = async (targetValue) => {
    let value = targetValue
    if (!amount || amount <= 0) {
      setCode('')
      toast.error('Insira a quantidade primeiro.')
      return
    }

    setCode(value)

    if (value?.length === 12) {
      // Por padrão, os códigos de barras possuem 12 dígitos no banco
      await api
        .get(`/produtos/${value}`)
        .then((resp) => {
          const alterarQuantidade = resp.data
          let isNewProduct = true
          alterarQuantidade.quantidade = amount
          const items = JSON.parse(localStorage.getItem('Produto') || '')
          items.forEach((item, index) => {
            if (item.id_produto === targetValue) {
              items[index].quantidade = Number(items[index].quantidade) + Number(amount)
              const targetItem = items[index]
              items.splice(index, 1)
              items.splice(0, 0, targetItem)
              setPosts(items)
              isNewProduct = false
            }
          })
          isNewProduct && setPosts((dados) => [resp.data, ...dados])
          setCode('')
        })
        .catch((err) => {
          setCode('')
          toast.error('Produto não encontrado.')
        })
        .finally(setAmount(1))
    }
  }

  const handleDelete = (index) => {
    list.splice(index, 1)
    setPosts(list)
  }

  const handleSave = async (e) => {
    // salvar em txt
    if (!posts.length) {
      toast.error('Adicione pelo menos um produto.')
      return
    } else if (note === '') {
      toast.error('Adicione a observação de lote')
      return
    }

    const user = JSON.parse(localStorage.getItem('user'))

    try {
      await api.post(`/lotes/${unidade}/${note}/${user.email}`, posts)
      setPosts([])
      toast.success('Arquivo salvo com sucesso!')
    } catch (error) {
      const err = { message: 'Algo deu errado!' }
      toast.error(err.message)
    } finally {
      setIsSaveButtonDisabled(false)
      setNote('')
    }
  }

  const ref = useRef(null)

  return (
    <>
      {
        <main className="container mt-3">
          <div className="teste">
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
                onChange={(e) => handleBarCodeChange(e.target.value)}
                onKeyDown={handleEnterKeyDown}
                autoFocus
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
          <Post
            posts={posts}
            onDelete={handleDelete}
            handleUpdateProductQuantity={handleUpdateProductQuantity}
          />
          <div className="saveButton">
            <Button
              variant="success"
              onClick={startSaveModal}
              id="button-addon2"
              className="shadow-none"
            >
              Salvar em .txt
            </Button>
          </div>
          <BatchSaveModal
            onShowModal={isSaveModalOpen}
            onConfirmModal={onConfirmSave}
            onHideModal={onHideSaveModal}
            posts={posts}
            isSaveButtonDisabled={isSaveButtonDisabled}
            onChangeNote={onChangeNote}
            note={note}
          />
        </main>
      }
    </>
  )
}

Bip.propTypes = {
  nome: PropTypes.string,
  descricao: PropTypes.string,
}

export default Bip
