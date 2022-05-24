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
    if (recovereUser) {
      setUser(JSON.parse(recovereUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password, category) => {
    console.log('login auth', { email, password, category })
    console.log(email)
    const [name] = email.split('@')
    try {
      await api.post('/users/login', { email, password })
      const loggedUser = {
        email,
        password,
        category,
      }
      localStorage.setItem('user', JSON.stringify(loggedUser))
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
    const [name] = email.split('@')
    navigate('/bip/' + category + '/' + name)
  }
  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout, redirectBip }}
    >
      {children}
    </AuthContext.Provider>
  )
}
