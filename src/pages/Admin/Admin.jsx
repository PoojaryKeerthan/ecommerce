import React from 'react'
import './Admin.scss'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
const Admin = () => {
  
  return(
    <div>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}
export default Admin