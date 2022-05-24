import React, { useState, createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// import {api, createSessions} from '../services/api'
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const recovereUser = localStorage.getItem('user')
        // const token = localStorage.getItem('token')
        // if (recovereUser && token) {
        if (recovereUser) {
            setUser(JSON.parse(recovereUser));
            // api.defaults.headers.Authorization = `Bearer ${token}`
        }
        setLoading(false)
    }, []);

    const login = async (email, password, category) => {
        console.log('login auth', { email, password, category });
        const name = JSON.stringify(email).split('@gerandofalcoes.com').join('').replaceAll('.', '-').replaceAll('"', '')
        // console.log(nome);
        // api criar uma session
        // const response = await createSessions(email, password);
        // console.log('login auth', response.data);

        // const loggedUser = response.data.user;
        // const token = response.data.token; 

        const loggedUser = {
            id: '123',
            email, password, category
        }
        localStorage.setItem('user', JSON.stringify(loggedUser))
        // localStorage.setItem('token', token)

        // api.defaults.headers.Authorization = `Bearer ${token}`

        if (category === '1' && password === "tamojunto") {
            setUser(loggedUser)
            navigate('/bip/' + category + '/' + name)
        } else if (category === '2' && password === "vaikida") {
            setUser(loggedUser)
            navigate('/bip/' + category + '/' + name)
        } else if (category === '3' && password === "ehnois") {
            setUser(loggedUser)
            navigate('/bip/' + category + '/' + name)
        } else if (category === '4' && password === "trabalhoduro") {
            setUser(loggedUser)
            navigate('/bip/' + category + '/' + name)
        } else if (category === '5' && password === "123") {
            setUser(loggedUser)
            navigate('/bip/' + category + '/' + name)
        } else if (category === '6' && password === "tamojunto") {
            setUser(loggedUser)
            navigate('/bip/' + category + '/' + name)
        } else if (category === '7' && password === "tamojunto") {
            setUser(loggedUser)
            navigate('/bip/' + category + '/' + name)
        } else if (category === '8' && password === "tamojunto") {
            setUser(loggedUser)
            navigate('/bip/' + category + '/' + name)
        } else if (category === '9' && password === "tamojunto") {
            setUser(loggedUser)
            navigate('/bip/' + category + '/' + name)
        } else if (category === '10' && password === "tamojunto") {
            setUser(loggedUser)
            navigate('/bip/' + category + '/' + name)
        } else if (category === '11' && password === "tamojunto") {
            setUser(loggedUser)
            navigate('/bip/' + category + '/' + name)
        } else if (category === '12' && password === "tamojunto") {
            setUser(loggedUser)
            navigate('/bip/' + category + '/' + name)
        } else if (category === '13' && password === "tamojunto") {
            setUser(loggedUser)
            navigate('/bip/' + category + '/' + name)
        } else if (category === '14' && password === "tamojunto") {
           setUser(loggedUser)
            navigate('/bip/' + category + '/' + name)
        } else if (category === '15' && password === "tamojunto") {
            setUser(loggedUser)
            navigate('/bip/' + category + '/' + name)
        } else if (category === '16' && password === "tamojunto") {
            setUser(loggedUser)
            navigate('/bip/' + category + '/' + name)
        } else toast.error("Dados de login ou categoria incorreta.")

    }

    const logout = () => {
        console.log('logout')
        localStorage.removeItem('user')
        localStorage.removeItem('Produto')
        // api.defaults.headers.Authorization = null
        setUser(null);
        navigate('/login');
    }
    const redirectBip = async (email, password, category) => {
        console.log('login auth', { email, password, category });
        const name = JSON.stringify(email).split('@gerandofalcoes.com').join('').replaceAll('.', '-').replaceAll('"', '')
        if (category === '1' && password === "tamojunto") {
            navigate('/bip/' + category + '/' + name)
        } else if (category === '2' && password === "vaikida") {
            navigate('/bip/' + category + '/' + name)
        } else if (category === '3' && password === "ehnois") {
            navigate('/bip/' + category + '/' + name)
        } else if (category === '4' && password === "trabalhoduro") {
            navigate('/bip/' + category + '/' + name)
        } else if (category === '5' && password === "123") {
            navigate('/bip/' + category + '/' + name)
        } else if (category === '6' && password === "tamojunto") {
            navigate('/bip/' + category + '/' + name)
        } else if (category === '7' && password === "tamojunto") {
            navigate('/bip/' + category + '/' + name)
        } else if (category === '8' && password === "tamojunto") {
            navigate('/bip/' + category + '/' + name)
        } else if (category === '9' && password === "tamojunto") {
            navigate('/bip/' + category + '/' + name)
        } else if (category === '10' && password === "tamojunto") {
            navigate('/bip/' + category + '/' + name)
        } else if (category === '11' && password === "tamojunto") {
            navigate('/bip/' + category + '/' + name)
        } else if (category === '12' && password === "tamojunto") {
            navigate('/bip/' + category + '/' + name)
        } else if (category === '13' && password === "tamojunto") {
            navigate('/bip/' + category + '/' + name)
        } else if (category === '14' && password === "tamojunto") {
            navigate('/bip/' + category + '/' + name)
        } else if (category === '15' && password === "tamojunto") {
            navigate('/bip/' + category + '/' + name)
        } else if (category === '16' && password === "tamojunto") {
            navigate('/bip/' + category + '/' + name)
        }
    }
    
    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout, redirectBip }}>
            {children}
        </AuthContext.Provider>

    )
}