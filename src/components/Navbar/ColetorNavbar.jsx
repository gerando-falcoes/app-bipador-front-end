import {Navbar, Nav, Container, Button} from 'react-bootstrap'
import Logo from "./logo.svg"
import LogoutModal from '../LogoutModal';
import { useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';
import { useContext } from 'react';



const ColetorNavbar = () => {

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const { logout, redirectBip } = useContext(AuthContext)

  const local = JSON.parse(localStorage.getItem('user'))

  const handleVoltarParaBipagem = () => {
    redirectBip(local.email, local.password, local.category)
  }

  const setCategoryName = (unidade) => {
    if (unidade === "5") {
      return "TESTE"
    } else if (unidade === "11") {
      return "ENTRADA CD"
    } else if (unidade === "12") {
      return "SAIDA CENTER NORTE"
    } else if (unidade === "13") {
      return "SAIDA POÁ"
    } else if (unidade === "14") {
      return "SAIDA SUZANO"
    } else if (unidade === "15") {
      return "SAIDA EUCALIPTOS"
    } else if (unidade === "16") {
      return "ENTRADA PJ"
    } else if (unidade === "17") {
      return "VENDA SELLERS"
    } else if (unidade === "18") {
      return "SAÍDA E-COMMERCE"
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

  return (
    <>
      <Navbar fixed="top" bg="black" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={Logo}
              width="100"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">

            <Nav className="me-auto ms-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link className="text-white" href="/">Início</Nav.Link>
              <Nav.Link className="text-white" onClick={handleVoltarParaBipagem}>Bipador</Nav.Link>
              <Nav.Link className="text-white" href="#lotes" disabled>
                Lotes
              </Nav.Link>
            </Nav>

            <Nav className="justify-content-end">
              <Button variant="outline-light" 
                  onClick={startLogoutModal}
                  id="button-addon2">
                    Logout
              </Button>
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>


{/*       <Navbar bg="black" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
            src={Logo}
            width="100"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav className="justify-content-end">

            <Nav.Link href="/">Início</Nav.Link>

            <Nav.Link onClick={handleVoltarParaBipagem}>Bipador</Nav.Link>

            <Nav.Link href="#lotes">Lotes</Nav.Link> 
          </Nav>

          <Nav className="justify-content-end">
            <Button variant="outline-light" 
                onClick={startLogoutModal}
                id="button-addon2">
                  Logout
            </Button>
          </Nav>
        </Container>
      </Navbar> */}

      <LogoutModal
        onShowModal={isLogoutModalOpen}
        onConfirmModal={handleLogout}
        onHideModal={onHideLogoutModal}
        message={'Você possui produtos bipados que ainda não foram salvos. Realizar o logout irá resultar na perda dos mesmos.'}        
      />
    </>
  )
}

export default ColetorNavbar