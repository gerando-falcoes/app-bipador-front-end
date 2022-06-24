import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import './LoginPage.css'
import Logo from "./logo.svg"

const LoginPage = () => {
  const { authenticated, login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [categoria, setCategoria] = useState('')
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true)

  const validateFields = () => {
    if (categoria && email && password) {
      setIsSubmitButtonDisabled(false)
    } else setIsSubmitButtonDisabled(true)
  }

  useEffect(() => {
    validateFields()
  }, [categoria, email, password])

  const handlersSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitButtonDisabled(true)
    await login(email, password, categoria)
    setIsSubmitButtonDisabled(false) // integração com meu contexto/api
  }

  return (
    <div id="login">
      <form className="form" onSubmit={handlersSubmit}>
        <img src={Logo} alt="Logo da Gerando Falcões"/>
        
        <div className="field">
          <select
            value={categoria}
            className="category"
            onChange={(e) => setCategoria(e.target.value)}
            id="Categoria"
            name="Categoria"
            placeholder='Categoria'
          >
            <option value="" disabled selected>Categoria</option>
            <option value="11" >ENTRADA CD</option>
            <option value="12">SAIDA CENTER NORTE</option>
            <option value="13">SAIDA POÁ</option>
            <option value="14">SAIDA SUZANO</option>
            <option value="15">SAIDA EUCALIPTOS</option>
            <option value="16">ENTRADA PJ</option>
            <option value="17">VENDA SELLERS </option>
            <option value="18">SAÍDA E-COMERCE</option>
            {/* <option value="1">INVENTÁRIO CD</option>
                        <option value="2">INVENTÁRIO LOJA POA </option>
                        <option value="3">INVENTÁRIO E_COMMERCE</option>
                        <option value="4">INVENTÁRIO CN</option>
                        <option value="6">INVENTÁRIO CD-LIVROS</option>
                        <option value="7">INVENTÁRIO CD-ELETRO</option>
                        <option value="8">INVENTÁRIO CD-E_COMMERCE</option>
                        <option value="9">INVENTÁRIO CD-BRINQUEDO</option>
                        <option value="10">INVENTÁRIO CD-MOVEIS</option> */}
            <option value="5">TESTE</option>
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
            type="password"
            className="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
