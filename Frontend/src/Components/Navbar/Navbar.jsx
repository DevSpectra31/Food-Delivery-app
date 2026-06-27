import React, { useState } from 'react'
import "./Navbar.css";
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {StoreContext} from "../../Context/StoreContext";
import axios from 'axios';
import { toast } from 'react-toastify';
const Navbar = ({ setshowLogin }) => {
  const [menu, setmenu] = useState('home')
  const{token,url,setToken}=useContext(StoreContext)
  console.log("navbar token : ",token)
  const logout = async()=>{
    try {
      const response=await axios.post(`${url}api/v1/users/logout`,
        {},
        {
          headers :{
            token : token,
          }
        },
        {withCredentials : true}
      );
      localStorage.removeItem("token")
      setToken('')
      toast.success("user is logged out")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='navbar'>
      <Link to="/">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "8px",
            background: "#ff4b1e", display: "flex",
            alignItems: "center", justifyContent: "center"
          }}>
            <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
              <path d="M18 3L8 16H15L12 27L22 14H15L18 3Z"
                fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900, fontSize: "32px",
            letterSpacing: "-1px", textTransform: "uppercase",
            lineHeight: 1, textDecoration: "none"
          }}>
            <span style={{ color: "#ff4b1e" }}>Zip</span>
            <span style={{ color: "#222222" }}>Food</span>
            <span style={{ color: "#ff4b1e" }}>.</span>
          </span>
        </div>
      </Link>

      <ul className='navbar-menu'>
        <Link to="/" onClick={() => setmenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href="#explore-menu" onClick={() => setmenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href="#app-download" onClick={() => setmenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href="#footer" onClick={() => setmenu("contact us")} className={menu === "contact us" ? "active" : ""}>contact us</a>
      </ul>

      <div className='navbar-right'>
        <img src={assets.search_icon} alt="search icon" />
        <div className='navbar-search-icon'>
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket" />
          </Link>
          <div className='dot'></div>
        </div>
        {
          !token ? (
            <button onClick={()=>setshowLogin(true)}>
              Login
            </button>
          ) : (
            <button onClick={logout}>
              Logout
            </button>
          )
        }
      </div>
    </div>
  )
}

export default Navbar;