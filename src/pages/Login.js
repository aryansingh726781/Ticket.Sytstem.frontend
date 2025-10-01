import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { AuthContext } from '../context/AuthContext'
import "./Login.css"; // ✅ import CSS

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)
  const { login } = useContext(AuthContext)
  const nav = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setErr(null)
    try {
      const r = await api.post('/auth/login', { email, password })
      login(r.data.token, r.data.user)
      nav('/')
    } catch (error) {
      setErr(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className="login-page">
      <form onSubmit={submit} className="login-form">
        <h2>Login</h2>
        <div className="input-group">
          <input 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
          />
        </div>
        <div className="input-group">
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
          />
        </div>
        <button className="btn-login">Login</button>
        {err && <div className="error-msg">{err}</div>}
      </form>
    </div>
  )
}
