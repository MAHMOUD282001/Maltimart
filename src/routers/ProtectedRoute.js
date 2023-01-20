import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import UseAuth from "../CustomHooks/UseAuth"

function ProtectedRoute() {
  const {currentUser} = UseAuth()
  return (
    currentUser ? <Outlet/> : <Navigate to= "/login"/>
  )
}

export default ProtectedRoute