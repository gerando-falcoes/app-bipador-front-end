import React, { useState, createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../services/api'

// import {api, createSessions} from '../services/api'
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const recovereUser = localStorage.getItem('user')
    // const token = localStorage.getItem('token')
    // if (recovereUser && token) {
    if (recovereUser) {
      setUser(JSON.parse(recovereUser))
      // api.defaults.headers.Authorization = `Bearer ${token}`
    }
    setLoading(false)
  }, [])

  const login = async (email, password, category) => {
    console.log('login auth', { email, password, category })
    console.log(email)
    const [name, company] = email.split('@')
    try {
      await api.post('/users/login', { email, password })
      const loggedUser = {
        email,
        password,
        category,
      }
      localStorage.setItem('user', JSON.stringify(loggedUser))
      // localStorage.setItem('token', token)
      // api.defaults.headers.Authorization = `Bearer ${token}`
      setUser(loggedUser)
      navigate('/bip/' + category + '/' + name)
    } catch (err) {
      console.log(err)
      toast.error(err.message && 'Dados de login ou categoria incorreta.')
    }
  }

  const logout = (email, password, category) => {
    console.log('logout')
    localStorage.removeItem('user')
    localStorage.removeItem('Produto')
    // api.defaults.headers.Authorization = null
    setUser(null)
    navigate('/login')
  }
  const redirectBip = async (email, password, category) => {
    console.log('login auth', { email, password, category })
    const name = JSON.stringify(email)
      .split('@gerandofalcoes.com')
      .join('')
      .replaceAll('.', '-')
      .replaceAll('"', '')
    if (category === '1' && password === 'tamojunto') {
      navigate('/bip/' + category + '/' + name)
    } else if (category === '2' && password === 'vaikida') {
      navigate('/bip/' + category + '/' + name)
    } else if (category === '3' && password === 'ehnois') {
      navigate('/bip/' + category + '/' + name)
    } else if (category === '4' && password === 'trabalhoduro') {
      navigate('/bip/' + category + '/' + name)
    } else if (category === '5' && password === '123') {
      navigate('/bip/' + category + '/' + name)
    } else if (category === '6' && password === 'tamojunto') {
      navigate('/bip/' + category + '/' + name)
    } else if (category === '7' && password === 'tamojunto') {
      navigate('/bip/' + category + '/' + name)
    } else if (category === '8' && password === 'tamojunto') {
      navigate('/bip/' + category + '/' + name)
    } else if (category === '9' && password === 'tamojunto') {
      navigate('/bip/' + category + '/' + name)
    } else if (category === '10' && password === 'tamojunto') {
      navigate('/bip/' + category + '/' + name)
    }
  }
  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout, redirectBip }}
    >
      {children}
    </AuthContext.Provider>
  )
}
