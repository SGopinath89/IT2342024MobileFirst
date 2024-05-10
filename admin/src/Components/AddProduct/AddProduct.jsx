import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

    const [image,setImage] = useState(false);

    const [productDetails, setProductDetails] = useState({
        name:"",
        image:"",
        new_price:"",
        old_price:""
    })

    const imageHandler = (e)=>{
        setImage(e.target.files[0]);
    }

    const changeHandler = (e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value});
    }

    const Add_Product = async ()=>{
        //connect with backend
        let responseData;
        let product = productDetails;  //copy of product object

        let formData = new FormData();
        formData.append('product', image);

        //sending formdata to API , upload image and get image url

        const upload_url = import.meta.env.VITE_UPLOAD_API_URL;
        await fetch(upload_url,{
            method:'POST',
            headers:{
                Accept:'application/json'
            },
            body:formData,
        }).then((resp)=> resp.json()).then((data)=>{responseData=data})

        if(responseData.success){
            product.image = responseData.image_url;

            //save product in MongoDB database

            const addProduct_url = import.meta.env.VITE_ADD_PRODUCT_API_URL;
            await fetch(addProduct_url,{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed");
            })
        }
    }

  return (
    <div className='add-product'>
        <div className="addproduct-itemfields">
            <p>Product Title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder='Type here' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfields">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here'/>
            </div>
            <div className="addproduct-itemfields">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here'/>
            </div>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt="" />
            </label>
            <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
        </div>
        <button onClick={()=>{Add_Product()}} className='add-product-btn'>ADD</button>
    </div>
  )
}

export default AddProduct