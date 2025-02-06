import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.scss'
function Sidebar() {
  return (
    <div class="container">
    <nav class="navbar">
      <nav class="navbar-menu">
        <ul>
          <li><NavLink to="/admin" activeClassName="active" >Home</NavLink></li>
          <li> <NavLink to="/admin/addproducts" activeClassName="active" >AddProducts</NavLink></li>
          <li> <NavLink to="/admin/viewproducts" activeClassName="active" >ViewProducts</NavLink></li>
          <li> <NavLink to="/admin/vieworders" activeClassName="active" >viewOrders</NavLink></li>
        </ul>
      </nav>
    </nav>
  </div>
  )
}

export default Sidebar;