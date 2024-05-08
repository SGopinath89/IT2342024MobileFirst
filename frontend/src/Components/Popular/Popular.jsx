import React from 'react'
import './Popular.css'
import popular_products from '../Assets/sample data/popularData';
import Item from '../Item/Item';

const Popular = () => {
  return (
    <div className='popular'>
        <h1>POPULAR SMARTPHONES</h1>
        <hr />
        <div className="popular-item">
            {popular_products.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default Popular