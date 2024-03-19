import React from 'react'
import '../Wrappers/dashboard.css'
import { useNavigate } from 'react-router-dom'
import { UseDispatch } from 'react-redux'
const Menu = () => {
  const navigate = useNavigate()
  return (
    <div className="menu">
    <h2>Menu</h2>
    <div className="menus">
      <span onClick={()=>navigate('/dashboard')}> Home</span>
      <span onClick={()=>navigate('/savedPosts')}>Saved</span>
      <span onClick={()=>navigate('/profile')}>Profile</span>
    </div>
 </div>
  )
}

export default Menu