import React from 'react'
import './NavBar.css'
import navlogo from '../../assets/Mobile1st.png'
import navProfile from '../../assets/nav-profile.svg'

const NavBar = () => {
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={navlogo} alt="" id='logo'/>
            <p>M O B I L E 1 <sup>st</sup> <span>( A D M I N )</span></p>
        </div>
        <img src={navProfile} alt="" className='nav-profile' />
    </div>
  )
}

export default NavBar