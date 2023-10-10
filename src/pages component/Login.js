import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import{auth} from '../Firebase';
import {  signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const [error,setError]=useState(false);
  const [loading,setloading]=useState(false);
  const navigate=useNavigate();
  const handleSubmit=async(event)=>{
    event.preventDefault();
    const email= event.target[0].value
    const password=event.target[1].value

    try {
      setloading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
      
    } catch (error) {
      setloading(false);
      setError(true);
      
    }
  }

  return (
    <>
      <div className="FormContainer">
        <div className="formWrapper">
          <span className="logo">Hello Chat</span>
          <span className="title">Login</span>
          <form action="" onSubmit={handleSubmit}>
            <input type="email" placeholder='enter your email' />
            <input type="password" placeholder='enter your password' />
            <button>Login</button>
            {loading && <div className='loader'></div>}
            {loading && <p>Please wait......</p>}
            {error && alert("check your Credentails!") }
          </form>
          <p style={{ color: "#7b96ec" }}>Create an Account? <Link to="/signup">Signup</Link> </p>
        </div>
      </div>
    </>
  )
}

export default Login
