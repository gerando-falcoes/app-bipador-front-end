import React, { useContext } from 'react';
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
                    <Route exact path="/" element={ <Private><HomePage /></Private>} />
                    <Route exact path="/bip/:id/:name" element={ <Private><Bipador /></Private>} />
                </Routes>
            </AuthProvider>
        </Router>

    )
}
export default AppRouter