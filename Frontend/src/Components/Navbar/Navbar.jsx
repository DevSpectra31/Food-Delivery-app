import React from 'react'
import "./Navbar.css"
import { useState } from 'react'
import { assets } from '../../assets/assets'
function Navbar() {
    const [menu,setmenu] = useState('home')
  return (
    <div className='navbar'>
      <img src={assets.logo} alt='logo'/>  
      <ul className='navbar-menu'>
        <li onClick={()=>setmenu("home")} className={menu === "home" ? "active" : ""}>home</li>
        <li onClick={()=>setmenu("menu")}className={menu === "menu" ? "active" : ""}>menu</li>
        <li onClick={()=>setmenu("mobile-app")}className={menu === "mobile-app" ? "active" : ""}>mobile-app</li>
        <li onClick={()=>setmenu("contact us")}className={menu === "contact us" ? "active" : ""}>contact us</li>
      </ul>
      <div className='navbar-right'>
        <image src={assets.search_icon} alt="serach icon" />
        <div className='navbar-search-icon'>
            <img src={assets.basket_icon}/>
            <div className='dot'></div>
        </div>
        <button>Sign in</button>
      </div>
    </div>
  )
}

export default Navbar