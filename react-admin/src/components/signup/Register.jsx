import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import "./signup.scss";
import axios from 'axios';
export default function Register() {
  const [username,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      
      if (response.status === 200) {
        toast.success(response.data.message); 
        navigate('/login');  
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error("Registration failed. Please try again.");
    }
  };
  return (
    <>
          <div className='register-container'>
            <h2>Register</h2>
               <form action="" onSubmit={handleSubmit}>
               <div className='input-group'>
                <label htmlFor="username">Username</label>
                <input type="text"
                onChange={(e)=> setName(e.target.value)} name="" id="username" />
               </div>
               <div className='input-group'>
                <label htmlFor="email">Emaiil</label>
                <input type="email" name="" onChange={(e)=>setEmail(e.target.value)} id="email" />
               </div>
               <div className='input-group'>
                <label htmlFor="password">Password</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} name="" id="password" />
               </div>
               <button type='submit'>Register</button>
               <p className='register-link'>
               Already have an account? <Link to={'/login'}>Login here</Link>
                </p>
               </form>
          </div>




    </>
  )
}