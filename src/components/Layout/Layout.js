import React from 'react'
import { useLocation } from 'react-router'
import AdminNav from '../../Admin/AdminNav/AdminNav'
import Routers from '../../routers/Routers'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

function Layout() {
  
  const location = useLocation()
  
  return (
    <>
        {location.pathname.startsWith("/dashboard")? <AdminNav/> :<Header/>}
        <div>
            <Routers/>
        </div>
        <Footer/>
    </>
  )
}

export default Layout