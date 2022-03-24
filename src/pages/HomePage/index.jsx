import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth'


const HomePage = () => {

    const local =JSON.parse(localStorage.getItem('user'))
    console.log(local.category)
    
    const { logout, redirectBip} = useContext(AuthContext)

    const handleLogout = () => {
        logout()
    }

    const handleVoltarParaBipagem = () => {
        redirectBip(local.email, local.password,local.category)
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