import React, { useContext, useState } from 'react'
import './NavBar.css'

import logo from '../Assets/icons/Mobile1st.png';
import cart_icon from '../Assets/icons/cart_icon.png';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../Context/ProductContext';

const NavBar = () => {

    const [menu, setMenu] = useState("home");
    const {getTotalCartItems} = useContext(ProductContext);

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" id='logo'/>
            <p>M O B I L E 1 <sup>st</sup></p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("home")}}><Link className='links' to='/'>Home</Link>{menu==="home"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("products")}}><Link className='links' to='products'>Products</Link>{menu==="products"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("contact")}}><Link className='links' to='contact'>Contact</Link>{menu==="contact"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            <Link className='links' to='/login'><button>Login</button></Link>
            <Link className='links' to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default NavBar