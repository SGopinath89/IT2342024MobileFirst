import React, { useEffect, useState } from 'react'
import './New.css'
//import new_products from '../Assets/sample data/newData';
import Item from '../Item/Item';

const New = () => {

  const [newProducts, setNewProducts] = useState([]);

  useEffect(()=>{
    const new_url = process.env.REACT_APP_NEW_URL;
    fetch(new_url).then((resp)=>resp.json()).then((data)=>setNewProducts(data));
  },[])

  return (
    <div className='new'>
        <h1>NEW SMARTPHONES</h1>
        <hr />
        <div className="new-item">
            {newProducts.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default New