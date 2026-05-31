import React, { useState } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const  Navbar=({setshowLogin})=> {
  const [menu, setmenu] = useState('home')

  return (
    <div className='navbar'>
      <Link to="/">
      <img src={assets.logo} alt='logo' />
      </Link>
      <ul className='navbar-menu'>
        <Link to="/" onClick={() => setmenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href="#explore-menu" onClick={() => setmenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href="#app-download" onClick={() => setmenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href="#footer" onClick={() => setmenu("contact us")} className={menu === "contact us" ? "active" : ""}>contact us</a>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt="search icon" />  {/* ✅ img not image */}
        <div className='navbar-search-icon'>
          <Link to="/cart">
          <img src={assets.basket_icon} alt="basket" />
          </Link>
          <div className='dot'></div>
        </div>
        <button onClick={()=>setshowLogin(true)}>Sign in</button>
      </div>
    </div>
  )
}

export default Navbar;