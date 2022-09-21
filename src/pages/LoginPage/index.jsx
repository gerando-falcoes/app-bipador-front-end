import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import './LoginPage.css'
import Logo from '../../assets/logo.svg'
import ShowPasswordTrue from '../../assets/showPasswordTrue.svg'
import ShowPasswordFalse from '../../assets/showPasswordFalse.svg'

const LoginPage = () => {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [categoria, setCategoria] = useState('')
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true)
  const [passwordShown, setPasswordShown] = useState(false);

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

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  }

  return (
    <div id="login">
      <form className="form" onSubmit={handlersSubmit}>
        <img src={Logo} alt="Logo da Gerando Falcões" />

        <div className="field">
          <select
            value={categoria}
            className="category"
            onChange={(e) => setCategoria(e.target.value)}
            id="Categoria"
            name="Categoria"
            placeholder="Categoria"
          >
            <option value="" disabled selected>
              Categoria
            </option>
            <option value="01">ENTRADA CD</option>
            <option value="02">ENTRADA PJ</option>
            <option value="16">SAÍDA CD</option>
            <option value="03">SAÍDA CENTER NORTE</option>
            <option value="04">SAÍDA POÁ</option>
            <option value="05">SAÍDA SUZANO</option>
            <option value="06">SAÍDA EUCALIPTOS</option>
            <option value="07">SAÍDA E-COMMERCE</option>
            <option value="08">VENDA SELLERS</option>
            <option value="09">INVENTÁRIO CD</option>
            <option value="10">INVETÁRIO LOJA POÁ</option>
            <option value="11">INVENTÁRIO E-COMMERCE</option>
            <option value="12">INVENTÁRIO CN</option>
            <option value="13">INVENTÁRIO SUZANO</option>
            <option value="14">INVENTÁRIO EUCALIPTOS</option>
            <option value="15">TESTES DEV</option>
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
            type={passwordShown ? "text" : "password"}
            className="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordShown ?           
            <img
              className="show-password"
              onClick={togglePassword}
              src={ShowPasswordTrue}
              alt="open eye"
              title="Ocultar senha"
            />
          :
            <img
              className="show-password"
              onClick={togglePassword}
              src={ShowPasswordFalse}
              alt="closed eye"
              title="Mostrar senha"
            />
          }
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
