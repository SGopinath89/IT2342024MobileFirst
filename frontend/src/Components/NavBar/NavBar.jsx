import React, { useState } from 'react'
import './NavBar.css'

import logo from '../Assets/icons/Mobile1st.png';
import cart_icon from '../Assets/icons/cart_icon.png';

const NavBar = () => {

    const [menu, setMenu] = useState("home");

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" id='logo'/>
            <p>M O B I L E 1 <sup>st</sup></p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("home")}}>Home{menu==="home"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("products")}}>Products{menu==="products"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("contact")}}>Contact{menu==="contact"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            <button>Login</button>
            <img src={cart_icon} alt="" />
            <div className="nav-cart-count">0</div>
        </div>
    </div>
  )
}

export default NavBar