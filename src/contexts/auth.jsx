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

  const login = async (email, password, categoryId, categoryName) => {
    const [name] = email.split('@')
    if (!categoryId || !categoryName) {
      toast.error('Dados de login ou categoria incorreta.')
      return
    }

    try {
      await api.post('/users/login', { email, password })
      const loggedUser = {
        email,
        password,
        categoryId,
        categoryName
      }
      localStorage.setItem('user', JSON.stringify(loggedUser))
      setUser(loggedUser)
      navigate('/bip/' + categoryId + '/' + name)
    } catch (err) {
      toast.error(err.message && 'Dados de login ou categoria incorreta.')
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('Produto')
    // api.defaults.headers.Authorization = null
    setUser(null)
    navigate('/login')
  }

  const redirectBip = async (email, password, categoryId, categoryName) => {
    const [name] = email.split('@')
    navigate('/bip/' + categoryId + '/' + name)
  }

  const redirectLotes = async (categoryName, categoryId) => {
    navigate('/categorias/' + categoryId + '/' + categoryName)
  }

  const redirectCategorias = async () => {
    navigate('/categorias/')
  }

  const redirectMesclador = async () => {
    navigate('/mesclador/')
  }

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout, redirectBip, redirectLotes, redirectCategorias, redirectMesclador}}
    >
      {children}
    </AuthContext.Provider>
  )
}
