import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username:"",
    password:"",
    email:""
  });

  const login = async ()=>{
    //console.log("Login function executed", formData);
    let responseData;
    const login_url = process.env.REACT_APP_LOGIN_URL;
    await fetch(login_url,{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData)
    }).then((resp)=>resp.json()).then((data)=>responseData=data);

    if(responseData.success){
      // Add the authentication token in the local storage
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }else{
      alert(responseData.errors);
    }
  }



  const signup = async ()=>{
    //console.log("Sign Up function executed", formData);
    let responseData;
    const signup_url = process.env.REACT_APP_SIGNUP_URL;
    await fetch(signup_url,{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData)
    }).then((resp)=>resp.json()).then((data)=>responseData=data);

    if(responseData.success){
      // Add the authentication token in the local storage
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }else{
      alert(responseData.errors);
    }
  }


  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input type="text" placeholder='Your Name' name='username' value={formData.username} onChange={changeHandler} />:<></>}
          <input type="email" placeholder='Email Address' name='email' value={formData.email} onChange={changeHandler} />
          <input type="password" placeholder='Password' name='password' value={formData.password} onChange={changeHandler} />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"?<p className="loginsignup-login">
          Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span>
        </p>:<p className="loginsignup-login">
          Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span>
        </p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup