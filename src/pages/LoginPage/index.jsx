import React, { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import './LoginPage.css'

const LoginPage = () => {
    const { authenticated, login } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [categoria, setCategoria] = useState('')


    const handlersSubmit = (e) => {

        e.preventDefault();
        console.log("enviar", { email, password });
        login(email, password, categoria) // integração com meu contexto/api
    }

    return (
        <div id="login">
            <h1 className="title">Login Do Sistema</h1>
            <p>{String(authenticated)}</p>
            <form className="form" onSubmit={handlersSubmit}>
                <div className="field">
                    <label htmlFor=""  className="email">Categoria</label>
                    <select value={categoria}  onChange={(e) => setCategoria(e.target.value)} id="Categoria" name="Categoria">
                        <option> </option>
                        <option value="11">ENTRADA CD</option>
                        <option value="12">SAIDA CENTER NORTE</option>
                        <option value="13">SAIDA POÁ</option>
                        <option value="14">SAIDA SUZANO</option>
                        <option value="15">SAIDA EUCALIPTOS</option>
                        <option value="1">INVENTÁRIO CD</option>
                        <option value="2">INVENTÁRIO LOJA POA </option>
                        <option value="3">INVENTÁRIO E_COMMERCE</option>
                        <option value="4">INVENTÁRIO CN</option>
                        <option value="6">INVENTÁRIO CD-LIVROS</option>
                        <option value="7">INVENTÁRIO CD-ELETRO</option>
                        <option value="8">INVENTÁRIO CD-E_COMMERCE</option>
                        <option value="9">INVENTÁRIO CD-BRINQUEDO</option>
                        <option value="10">INVENTÁRIO CD-MOVEIS</option>
                        <option value="5">TESTE</option>
                        
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="email" className="email">Email</label>
                    <input type="email" className="email" id="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="field">
                    <label htmlFor="password" className="password">senha</label>
                    <input type="password" className="password" id="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="action">
                    <button type="submit">Entrar</button>
                </div>

            </form>
        </div>
    );
}

export default LoginPage