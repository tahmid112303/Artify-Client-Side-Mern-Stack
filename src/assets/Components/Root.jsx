import React from 'react'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Footer from './Footer'
import Navbar from './NavBar'

const Root = () => {

  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>        
        <Footer></Footer>
        <ToastContainer></ToastContainer>
    </div>
  )
}

export default Root