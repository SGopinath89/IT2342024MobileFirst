import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../Assets/icons/breadcrum_arrow.png'

const Breadcrum = (props) => {
    const {product} = props;
  return (
    <div className='breadcrum'>
        HOME <img src={arrow_icon} alt="" /> Product <img src={arrow_icon} alt="" /> {product.name}
    </div>
  )
}

export default Breadcrum