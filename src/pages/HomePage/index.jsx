import React, {useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth'


const HomePage = () => {
    // const [password, setPassword] = useState('')
    // const [categoria, setCategoria] = useState('')
    // setCategoria(localStorage.getItem('user', ))
    // setPassword(localStorage.getItem('user', ))
    console.log(JSON.parse(localStorage.getItem('user')));
    const { logout, login} = useContext(AuthContext)
    const handleLogout = () => {
        logout()
    }
    const handleVoltarParaBipagem = () => {
        login()
    }

    return (
        <>
            <h1>home page</h1>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleVoltarParaBipagem}>ir para o bip</button>
        </>
    )
}

export default HomePage