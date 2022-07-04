import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Bipador from './pages/Bipador';


import { AuthProvider , AuthContext} from './contexts/auth';
import ColetorNavbar from './components/Navbar/ColetorNavbar';


const AppRouter = () => {
    const Private = ({ children }) => {
        const {authenticated, loading} = useContext(AuthContext);

        if (loading) {
            return <div className="loading">Carregando...</div>
        }
        if (!authenticated) {
            return <Navigate to='/login' />
        }
        return children
    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/" element={ <Private><ColetorNavbar /><HomePage /></Private>} />
                    <Route exact path="/bip/:id/:name" element={ <Private><ColetorNavbar /><Bipador /></Private>} />
                </Routes>
            </AuthProvider>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Router>

    )
}
export default AppRouter