import React from 'react'
import { Link } from 'react-router-dom'


export default function Sidebar({ user }){
return (
<aside style={{width:220,padding:12,borderRight:'1px solid #eee'}}>
<div style={{marginBottom:12,fontWeight:700}}>Menu</div>
<ul style={{listStyle:'none',padding:0}}>
<li><Link to="/">Dashboard</Link></li>
<li><Link to="/tickets">My Tickets</Link></li>
<li><Link to="/tickets/create">Create Ticket</Link></li>
{user && (user.role==='support' || user.role==='admin') && <li><Link to="/support">Support Panel</Link></li>}
{user && user.role==='admin' && <li><Link to="/admin">Admin</Link></li>}
</ul>
</aside>
)
}