import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import Logo from '../../assets/navbarLogo.svg'
import LogoutModal from '../LogoutModal'
import { useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import { useContext } from 'react'
import style from './ColetorNavbar.module.css'

const ColetorNavbar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const { logout, redirectBip } = useContext(AuthContext)

  const local = JSON.parse(localStorage.getItem('user'))

  const handleVoltarParaBipagem = () => {
    redirectBip(local.email, local.password, local.categoryId)
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

  let bipUrl = '/bip/' + local.categoryId + '/' + name

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
              {local.categoryName}
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
              <Nav.Link className={style.menuItem} href="/mesclador">
                Mesclador
              </Nav.Link>
              <Nav.Link className={style.menuItem} href="/checagem-de-retorno-de-produtos">
                Retorno de Produtos
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
