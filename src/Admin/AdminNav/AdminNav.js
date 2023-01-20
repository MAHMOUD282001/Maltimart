import React from 'react'
import { Container, Row } from 'reactstrap'
import UseAuth from "../../CustomHooks/UseAuth"
import "./AdminNav.css"
import { NavLink, useNavigate } from 'react-router-dom'

function AdminNav() {
  
  const {currentUser} = UseAuth()
  
  let navigate = useNavigate("/Maltimart")
  
  return (
    <>
    <header className='admin__header'>
        <Container>
            <div className='admin__nav-wrapper-top'>
                <div className='logo'>
                    <h2 onClick={()=>navigate("/Maltimart")}>Maltimart</h2>
                </div>
                
                <div className='search__box'>
                    <input type="text" placeholder='Search...'/>
                    <span><i className='ri-search-line'></i></span>
                </div>
                
                <div className='admin__nav-wrapper-top-right'>
                    <img src={currentUser && currentUser.photoURL} alt=''/>
                </div>
            </div>
        </Container>
    </header>
    
    <section className='admin__menu p-0'>
        <Container>
            <Row>
                <ul className='admin__menu-list'>
                    <li className='admin__menu-item'><NavLink className={(navClass)=>navClass.isActive ? "active__admin-menu" : ""} to = "/dashboard">Dashboard</NavLink></li>
                    <li className='admin__menu-item'><NavLink className={(navClass)=>navClass.isActive ? "active__admin-menu" : ""} to = "/dashboard/all-products">All Products</NavLink></li>
                    <li className='admin__menu-item'><NavLink className={(navClass)=>navClass.isActive ? "active__admin-menu" : ""} to = "/dashboard/add-products">Add Products</NavLink></li>
                    <li className='admin__menu-item'><NavLink className={(navClass)=>navClass.isActive ? "active__admin-menu" : ""} to = "/dashboard/users">Users</NavLink></li>
                </ul>
            </Row>
        </Container>
        
    </section>
    </>
  )
}

export default AdminNav