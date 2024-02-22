// Header.js
import React, { useState } from 'react';
import '../Wrappers/dashboard.css'
import { MdLogout } from "react-icons/md";
import axios from 'axios'
const Header = ({logOutFunc}) => {
  
  return (
    <div className="header-box">
      <header>CodeQuest</header>
      <input type="text" placeholder="Search for posts, users" />
      <div className="header-right-section">
        <img src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=-mUWsTSENkugJ3qs5covpaj-bhYpxXY-v9RDpzsw504=" alt="Profile Picture" className="profile-picture" />
        <MdLogout size={35} onClick={logOutFunc}/>
      </div>
    </div>
  );
};

export default Header;
