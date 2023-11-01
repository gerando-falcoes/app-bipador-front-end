import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import './LoginPage.css'
import api from '../../services/api'
import Logo from '../../assets/logo.svg'
import ShowPasswordTrue from '../../assets/showPasswordTrue.svg'
import ShowPasswordFalse from '../../assets/showPasswordFalse.svg'
import { toast } from 'react-toastify'

const LoginPage = () => {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [categories, setCategories] = useState([])
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true)
  const [passwordShown, setPasswordShown] = useState(false)

  const validateFields = () => {
    if (email && password && categoryId && categoryName) {
      setIsSubmitButtonDisabled(false)
    } else setIsSubmitButtonDisabled(true)
  }

  useEffect(() => {
    validateFields()
  }, [email, password, categoryId, categoryName])

  const handlersSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitButtonDisabled(true)
    await login(email, password, categoryId, categoryName)
    setIsSubmitButtonDisabled(false)
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  useEffect(() => {
    async function fetchCategoriesData() {
      try {
        const response = await api.get('/categorias')
        const categoriesData = await response.data
        setCategories(categoriesData)
      } catch (error) {
        toast.error('Nenhuma categoria encontrada.')
      }
    }
    fetchCategoriesData()
  }, [])

  const handleSelectCategoryChange = (event) => {
    const category = categories.find((category) => category.id === event.target.value)

    setCategoryId(event.target.value)
    setCategoryName(category.name)
  }

  return (
    <div id="login">
      <form className="form" onSubmit={handlersSubmit}>
        <img src={Logo} alt="Logo da Gerando Falcões" />

        <div className="field">
          <select
            value={categoryId}
            className="category"
            onChange={handleSelectCategoryChange}
            id="Categoria"
            name="Categoria"
            placeholder="Categoria"
          >
            <option value="" disabled>
              Selecione a Categoria
            </option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              )
            })}
          </select>
        </div>
        <div className="field">
          <input
            type="email"
            className="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <input
            type={passwordShown ? 'text' : 'password'}
            className="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordShown ? (
            <img
              className="show-password"
              onClick={togglePassword}
              src={ShowPasswordTrue}
              alt="open eye"
              title="Ocultar senha"
            />
          ) : (
            <img
              className="show-password"
              onClick={togglePassword}
              src={ShowPasswordFalse}
              alt="closed eye"
              title="Mostrar senha"
            />
          )}
        </div>
        <div className="action">
          <button type="submit" disabled={isSubmitButtonDisabled}>
            Entrar
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
