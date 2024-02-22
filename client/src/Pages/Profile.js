// Profile.js
import React from 'react';
import '../Wrappers/profile.css' // Import your CSS file

const Profile = () => {
  return (
    <div>
     
      <div className="profile-container">
        <img className="profile-photo" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Profile" />
        <div className="user">
          <span id="username">Pushti Shah</span>
          <span id="connections">53 Connections</span>
        </div>
        <button>Edit</button>
      </div>
      <div className="user-detail-outer-container">
     
        <div className="user-details">
             <h2 >Profile</h2>
          <div className="field">
            <span>UserName:</span>
            <input type="text" value="Pushti" />
          </div>
          <div className="field">
            <span>Email:</span>
            <input type="text" value="Pushti" />
          </div>
          <div className="field">
            <span>Experience:</span>
            <input type="text" value="Pushti" />
          </div>
          <div className="field">
            <span>Bio:</span>
            <textarea name="" id="" cols="30" rows="5">Pushti is a MERN Stack Developer. working as a trainee in Technostacks infotech</textarea>
          </div>
          <div className="field">
            <span>Education:</span>
            <input type="text" value="Pushti" />
          </div>
          <div className="field">
            <span>Github:</span>
            <input type="text" value="Pushti" />
          </div>
          <div className="field">
            <span>Linkedin:</span>
            <input type="text" value="Pushti" />
          </div>
        </div>
        <div className="connection-container">
          <h2>Connections</h2>
          <div className="connection">
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
              <span>Yagni Shah</span>
            </div>
            <span style={{ color: 'rgb(69, 147, 173)', cursor: 'pointer' }}>Unfollow</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
