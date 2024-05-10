import React from 'react'
import './Hero.css'
import hero_image from '../Assets/images/hero_image.jpg';

const Hero = () => {
  return (
    <div className='hero'>
        <div className="img-container">
            <img src={hero_image} alt=""/>
            <div className="shade"></div>
        </div>

        <div className="texts">
            <h2>M O B I L E 1<sup>st</sup></h2>
            <p>The Leading smartphone sellers in America.<br/>We are providing customer satisfied service all over the country.
            <br/><br/>
            <span>TRUST | LOW PRICE | CUSTOMER FRIENDLY</span>
            </p>
        </div>
    </div>
  )
}

export default Hero