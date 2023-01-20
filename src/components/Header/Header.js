import React, { useEffect, useRef, useState } from 'react'
import { Container, Row } from 'reactstrap'
import {motion} from "framer-motion"
import "./Header.css"
import logo from "../../assets/images/eco-logo.png"
import userIcon from "../../assets/images/user-icon.png"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UseAuth from '../../CustomHooks/UseAuth'
import { auth } from '../../firebase.config' 
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'


function Header() {
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  
  let menuRef = useRef()
  
  let menuToggle = ()=> menuRef.current.classList.toggle("active__menu")
  
  let headerRef = useRef(null)
  
  const profileActionsRef = useRef(null)
  
  let stickyHeader = ()=>{
    window.addEventListener("scroll", ()=>{
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        headerRef.current.classList.add("sticky__header")
      }
      
      else{
        headerRef.current.classList.remove("sticky__header")
      }
    })
  }
  
  useEffect(()=>{
    stickyHeader()
    
    return ()=> window.removeEventListener("scroll", stickyHeader)
  })
  
  const navigate = useNavigate()
  
  const navigateToCart = ()=>{
    navigate("/cart")
  }
  
  const {currentUser} = UseAuth()
  
  const toggleProfileActions = ()=> profileActionsRef.current.classList.toggle("show__profileActions")
  
  const logout = ()=>{
    signOut(auth).then(()=>{
      toast.success("Logged Out")
      
      navigate("/Maltimart")
    }).catch(error => {
      toast.error(error.message)
    })
  }
  
  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className='nav__wrapper'>
            <div className='logo'>
              <img src={logo} alt = "logo"/>
              
              <div>
                <h1>Multimart</h1>
              </div>
            </div>
            
            <div className='navigation' ref={menuRef} onClick = {menuToggle}>
              <ul className='menu'>
                <li className='nav__item'>
                  <NavLink to = 'Maltimart' className={(navClass)=> navClass.isActive ? 'nav__active' : ''}>Home</NavLink>
                </li>
                
                <li className='nav__item'>
                  <NavLink to = 'shop' className={(navClass)=> navClass.isActive ? 'nav__active' : ''}>Shop</NavLink>
                </li>
                
                <li className='nav__item'>
                  <NavLink to = 'cart' className={(navClass)=> navClass.isActive ? 'nav__active' : ''}>Cart</NavLink>
                </li>
              </ul>
            </div>
            
            <div className='nav__icons'>
              <span className='cart__icon' onClick={navigateToCart}>
                <i className='ri-shopping-bag-line'></i>
                <span className='badge'>{totalQuantity}</span>
              </span>
              
              <div className='profile'>
                <motion.img whileTap = {{scale: 1.2}} src = {currentUser? currentUser.photoURL : userIcon} alt = ""  onClick = {toggleProfileActions}/>
                
                
                <div className='profile__actions' ref={profileActionsRef} onClick = {toggleProfileActions}>
                  {
                    currentUser ? 
                    <div className='d-flex align-items-center justify-content-center flex-column'>
                      <Link to= "/dashboard">Dashboard</Link>
                      <Link onClick={logout}>Logout</Link>
                    </div> : 
                    <div className='d-flex align-items-center justify-content-center flex-column'>
                      <Link to= "/signup">Signup</Link>
                      <Link to= "/login">Login</Link>
                      <Link to= "/dashboard">Dashboard</Link>
                    </div>
                  }
                </div>
              </div>
              
              
              <div className='mobile__menu'>
                <span onClick={menuToggle}><i className='ri-menu-line'></i></span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header