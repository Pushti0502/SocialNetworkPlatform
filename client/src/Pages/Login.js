import React,{useState} from 'react'
import '../Wrappers/login.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logIn } from '../redux/actions/user'

const Login = () => {
  const dispatch =useDispatch()
  const navigate = useNavigate();
  const [user,setUser]=useState({email:"",password:""});
  const handleChange=(event)=>{
    const {name,value}= event.target;
   setUser((prevData)=>({...prevData,[name]:value}))
  }
  
  const handleSubmit = (event) => {
   event.preventDefault();
   dispatch(logIn(user.email,user.password))
    navigate('/dashboard');
   
  };
  return (
    <div className='login'>
      
      <form className="login-container">
      <h2>Login to CodeQuest</h2>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name='email' onChange={ handleChange} value={user.email} placeholder="Enter your email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name='password' onChange={handleChange} value={user.password}placeholder="Enter your password" />
        <button type="submit" onClick={handleSubmit} >LogIn</button>
      </form>
      <div className='bottom-container'>
      <span>Not have an account? </span>
      <a href='/signup'>SignUp</a>
      </div>
      <button className="button" id="login-button">SignUp with Google</button>
      <h4>or</h4>
      <h4>Login with GitHub</h4>
    </div>
  )
}

export default Login