import React from 'react'
import './Footer.css'
import footer_image from '../Assets/images/footer_image.jpg'
import instagram_icon from '../Assets/icons/instagram_icon.png'
import whatsapp_icon from '../Assets/icons/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-img-container">
            <img src={footer_image} alt=""/>
            <div className="footer-shade"></div>
        </div>

        <div className='contents'>
            <div className="footer-logo">
                <p>M O B I L E 1 <sup>st</sup></p>
            </div>

            <div className="footer-social-icons">
                <div className="footer-icons-container">
                    <img src={instagram_icon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={whatsapp_icon} alt="" />
                </div>
            </div>

            <ul className="contacts">
                <li>mobile1st@gmail.com</li>
                <li>+1234567890</li>
                <li>No:7, King street, America</li>
            </ul>

            <div className="footer-copyright">
                <hr />
                <p>Copyright @ Mobile1st - All Rights Reserved</p>
            </div>
        </div>
    </div>
  )
}

export default Footer