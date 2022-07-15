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
    const [name] = email.split('@')
    if (!category) {
      toast.error('Dados de login ou categoria incorreta.')
      return
    }

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
      toast.error(err.message && 'Dados de login ou categoria incorreta.')
    }
  }

  const logout = (email, password, category) => {
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

  const redirectLotes = async (categoriaName, categoriaId) => {
    navigate('/categorias/' + categoriaId + '/' + categoriaName)
  }

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout, redirectBip, redirectLotes }}
    >
      {children}
    </AuthContext.Provider>
  )
}
