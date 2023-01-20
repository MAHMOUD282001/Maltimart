import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import AddProducts from '../Admin/AddProducts/AddProducts'
import AllProducts from '../Admin/AllProducts/AllProducts'
import Dashboard from '../Admin/Dashboard/Dashboard'
import Users from '../Admin/Users/Users'
import Cart from '../Pages/Cart/Cart'
import Checkout from '../Pages/Checkout/Checkout'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import ProductDetails from '../Pages/ProductDetails/ProductDetails'
import Shop from '../Pages/Shop/Shop'
import SignUp from '../Pages/SignUp/SignUp'
import ProtectedRoute from './ProtectedRoute'

function Routers() {
  return (
    <Routes>
        <Route path='/' element = {<Navigate to = "Maltimart"/>}/>
        <Route path='Maltimart' element = {<Home/>}/>
        <Route path='shop' element = {<Shop/>}/>
        <Route path='shop/:id' element = {<ProductDetails/>}/>
        <Route path='cart' element = {<Cart/>}/>
        <Route path='/*' element = {<ProtectedRoute/>}>
          <Route path='checkout' element = {<Checkout/>}/>
          <Route path='dashboard' element = {<Dashboard/>}/>
          <Route path='dashboard/all-products' element = {<AllProducts/>}/>
          <Route path='dashboard/add-products' element = {<AddProducts/>}/>
          <Route path='dashboard/users' element = {<Users/>}/>
          
        </Route>
        <Route path='login' element = {<Login/>}/>
        <Route path='signup' element = {<SignUp/>}/>
    </Routes>
  )
}

export default Routers