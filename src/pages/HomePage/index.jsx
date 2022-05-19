import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Button } from 'react-bootstrap'

import './HomePage.css'

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
        <div className='container'>
            <div className='home'>
                <h1 className='title'>Home Page</h1>
                <div className='buttonContainer'>
                    <Button onClick={handleVoltarParaBipagem} variant="secondary">Ir para o Bip</Button>
                    <Button onClick={handleLogout} variant="secondary">Logout</Button>
                </div>
            </div>
        </div>
    )
}

export default HomePage
