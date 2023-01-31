import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import Logo from '../../assets/navbarLogo.svg'
import LogoutModal from '../LogoutModal'
import { useState, useEffect } from 'react'
import { AuthContext } from '../../contexts/auth'
import { useContext } from 'react'
import style from './ColetorNavbar.module.css'

const ColetorNavbar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const { logout, redirectBip } = useContext(AuthContext)

  const local = JSON.parse(localStorage.getItem('user'))

  const handleVoltarParaBipagem = () => {
    redirectBip(local.email, local.password, local.category)
  }

  const setCategoryName = (unidade) => {
    if (unidade === '01') {
      return 'ENTRADA CD'
    } else if (unidade === '02') {
      return 'ENTRADA PJ'
    } else if (unidade === '03') {
      return 'SAÍDA CENTER NORTE'
    } else if (unidade === '04') {
      return 'SAÍDA POÁ'
    } else if (unidade === '05') {
      return 'SAÍDA SUZANO'
    } else if (unidade === '06') {
      return 'SAÍDA EUCALIPTOS'
    } else if (unidade === '07') {
      return 'SAÍDA E-COMMERCE'
    } else if (unidade === '17') {
      return 'SAÍDA CAMPO LIMPO'
    } else if (unidade === '08') {
      return 'VENDA SELLERS'
    } else if (unidade === '09') {
      return 'INVENTÁRIO CD'
    } else if (unidade === '10') {
      return 'INVETÁRIO LOJA POÁ'
    } else if (unidade === '11') {
      return 'INVENTÁRIO E-COMMERCE'
    } else if (unidade === '12') {
      return 'INVENTÁRIO CN'
    } else if (unidade === '13') {
      return 'INVENTÁRIO SUZANO'
    } else if (unidade === '14') {
      return 'INVENTÁRIO EUCALIPTOS'
    } else if (unidade === '15') {
      return 'TESTES DEV'
    } else if (unidade === '16') {
      return 'SAÍDA CD'
    }
  }

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

  const [name] = local.email.split('@')

  let bipUrl = '/bip/' + local.category + '/' + name

  return (
    <>
      <Navbar fixed="top" bg="black" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand className="me-0" href="/">
            <img
              className={style.navbarLogo}
              src={Logo}
              width="100"
              height="30"
              alt="Gerando Falcões logo"
            />
          </Navbar.Brand>

          <Nav className={style.category}>
            <Nav.Link className="text-white me-4" disabled>
              {setCategoryName(local.category)}
            </Nav.Link>
          </Nav>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className={style.menu} style={{ maxHeight: '150px', width: '100%' }} navbarScroll>
              <Nav.Link className={style.menuItem} href="/">
                Início
              </Nav.Link>
              <Nav.Link className={style.menuItem} href={bipUrl}>
                Bipador
              </Nav.Link>
              <Nav.Link className={style.menuItem} href="/categorias">
                Lotes
              </Nav.Link>
            </Nav>

            <Nav className="justify-content-end">
              <Button variant="outline-light" onClick={startLogoutModal} id="button-addon2">
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LogoutModal
        onShowModal={isLogoutModalOpen}
        onConfirmModal={handleLogout}
        onHideModal={onHideLogoutModal}
        message={
          'Você possui produtos bipados que ainda não foram salvos. Realizar o logout irá resultar na perda dos mesmos.'
        }
      />
    </>
  )
}

export default ColetorNavbar
