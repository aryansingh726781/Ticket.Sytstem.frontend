import React, { createContext, useEffect, useState } from 'react'
import api from '../api/axios'


export const AuthContext = createContext()


export function AuthProvider({ children }){
const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)


useEffect(()=>{
const token = localStorage.getItem('token')
if (token) {
api.get('/me').then(res=>{ setUser(res.data); setLoading(false) }).catch(()=>{ setUser(null); setLoading(false) })
} else setLoading(false)
}, [])


function login(token, userData){
localStorage.setItem('token', token)
setUser(userData)
}
function logout(){
localStorage.removeItem('token')
setUser(null)
}


return (
<AuthContext.Provider value={{ user, login, logout, loading }}>
{children}
</AuthContext.Provider>
)
}



