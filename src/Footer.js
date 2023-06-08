import React from 'react'
import './styles/Footer.css';
import { Link } from "react-router-dom"

export const Footer = () => {
    return (
        <div className='footer'>
            <Link to="/about"> About Us </Link>
            <Link to="/contact"> Contact </Link>
        </div>
    )
}