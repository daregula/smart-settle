import React from 'react'
import './styles/Navbar.css';
import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <div className='navbar'>
        SmartSettle
        <Link to="/"> Home </Link>
        <Link to="/login"> Login </Link>
    </div>
  )
}
