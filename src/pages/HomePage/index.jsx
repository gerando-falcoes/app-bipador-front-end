import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

const HomePage = () => {
    const local = JSON.parse(localStorage.getItem('user'))
    console.log(local.category)
    
    const { logout, redirectBip } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
    }

    const handleVoltarParaBipagem = () => {
        redirectBip(local.email, local.password, local.category)
    }

    return (
        <>
            <h1>Home Page</h1>
            <button onClick={handleVoltarParaBipagem}>Ir para o Bip</button>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default HomePage
