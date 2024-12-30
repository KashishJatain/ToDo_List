import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <h1>To-Do List📄</h1>
      <NavLink to="/" className={({isActive})=>isActive?'activeLink':'inActiveLink'}>HOME</NavLink>
      <li><NavLink to="/About" className={({isActive})=>isActive?'activeLink':'inActiveLink'}>ABOUT</NavLink></li>
    </nav>
  )
}

export default Navbar
