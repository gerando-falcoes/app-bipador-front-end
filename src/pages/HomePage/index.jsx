import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { Button } from 'react-bootstrap'

import './HomePage.css'
import { useState } from 'react'
import LogoutModal from '../../components/LogoutModal'

const HomePage = () => {
  const local = JSON.parse(localStorage.getItem('user'))
  console.log(local.category)

  const { logout, redirectBip } = useContext(AuthContext)

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const handleLogout = () => {
    setIsLogoutModalOpen(false)
    logout()
  }

  const onHideLogoutModal = () => {
    setIsLogoutModalOpen(false)
  }

  const startLogoutModal = () => {
    let products = JSON.parse(localStorage.getItem('Produto'))
    if (products.length !== 0) {
      setIsLogoutModalOpen(true)
    } else if (products.length === 0) {
      handleLogout()
    }
  }

  const handleVoltarParaBipagem = () => {
    redirectBip(local.email, local.password, local.category)
  }

  return (
    <div className="homeContainer">
      <div className="home">
        <h1 className="title">Home Page</h1>
        <div className="buttonContainer">
          <Button onClick={handleVoltarParaBipagem} variant="secondary">
            Ir para o Bip
          </Button>
          <Button onClick={startLogoutModal} variant="secondary">
            Logout
          </Button>
        </div>
      </div>
      <LogoutModal
        onShowModal={isLogoutModalOpen}
        onConfirmModal={handleLogout}
        onHideModal={onHideLogoutModal}
        message={
          'Você possui produtos bipados que ainda não foram salvos. Realizar o logout irá resultar na perda dos mesmos.'
        }
      />
    </div>
  )
}

export default HomePage
