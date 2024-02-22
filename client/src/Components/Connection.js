// Connections.js
import React,{useState ,useEffect}from 'react';
import '../Wrappers/dashboard.css'

const Connections = () => {
  const[isFollow,setIsFollow]=useState(true)
  const handleFollow=()=>{
    setIsFollow(!isFollow)
  }

  return (
    <div className="connections">
      <h2>My Connections</h2>
      <div className="connection-card"> 
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px'}}>
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className="profile-picture" />
          <span>Pushti Shah</span>
        </div>
        {isFollow? <span onClick={handleFollow} id='follow'>Unfollow</span>: <span onClick={handleFollow}id='follow'>Follow</span>}
      </div>
    
     
    </div>
  );
};

export default Connections;
