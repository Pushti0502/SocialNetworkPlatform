import React, { useEffect, useState, useRef } from 'react';
import '../Wrappers/profile.css';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import {
    updateUser,
    getFollowingData,
    unfollowUsers,
    getUserDataById,
} from '../redux/actions/user';

const Profile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const user =
        useSelector((state) => state.user.user) ||
        JSON.parse(localStorage.getItem('user'));

    const followeduserdata = useSelector((state) => state.user.followingData);
    const [User, setUser] = useState({
        username: user.user.username,
        email: user.user.email,
        bio: user.user.bio,
        education: user.user.education,
        linkedin: user.user.linkedin,
        experience: user.user.experience,
        profile: user.user.profile,
        github: user.user.github,
        connections: user.user.connection,
        profilephoto: user.user.profilephoto,
    });
    const dispatch = useDispatch();
    const handleEdit = () => {
        setIsEdit(!isEdit);
    };

    const handleChange = (event) => {
        if (event.target.name === 'profilephoto') {
            setUser((prevData) => ({
                ...prevData,
                profilephoto: event.target.files[0],
            }));
        } else {
            const { name, value } = event.target;
            setUser((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        Object.entries(user).forEach(([key, value]) => {
            if (key === 'profilephoto' && event.target.profilephoto.files.length > 0) {
                formData.append(key, event.target.profilephoto.files[0]);
            } else if (key !== 'profilephoto') {
                formData.append(key, value);
            }
        });
    
        dispatch(updateUser(user.user._id, formData));
        dispatch(getUserDataById(user.user._id))
        handleEdit();
    };
    

  
    const handleUnFollow = (id) => {
        dispatch(unfollowUsers(id, user.user._id));
    };

    useEffect(() => {
        dispatch(getFollowingData(user.user._id)); 
       
      
      
    }, [dispatch, followeduserdata,user]);

    return (
        <div>
            <div className="profile-container">
                <div className="avatar-container">
                    <div className="avatar-wrapper">
                        <img
                            className="profile-photo"
                            src={user.user.profilephoto}
                            alt="Profile"
                        />
                        <div className="upload-profile">
                            <MdAddPhotoAlternate
                                size={25}
                                color="black
        "
                            />
                            <input
                                type="file"
                                accept="image/*"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    opacity: 0,
                                    cursor: 'pointer',
                                }}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="user">
                    <span id="username">{user.user.username}</span>
                    <span id="connections">
                        {followeduserdata.length} Connections
                    </span>
                </div>
                <button onClick={handleEdit}>Edit</button>
                {isEdit && (
                    <div className="edit-container">
                        <div className="user-details">
                            <h2>Profile</h2>
                            <div className="field">
                                <span>UserName:</span>
                                <input
                                    type="text"
                                    value={User.username}
                                    name="username"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="field">
                                <span>Email:</span>
                                <input
                                    type="text"
                                    value={User.email}
                                    name="email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="field">
                                <span>Experience:</span>
                                <input
                                    type="text"
                                    value={User.experience}
                                    name="experience"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="field">
                                <span>Bio:</span>
                                <textarea
                                    name="bio"
                                    id=""
                                    onChange={handleChange}
                                    cols="30"
                                    rows="5"
                                >
                                    {User.bio}
                                </textarea>
                            </div>
                            <div className="field">
                                <span>Education:</span>
                                <input
                                    type="text"
                                    name="education"
                                    value={User.education}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="field">
                                <span>Github:</span>
                                <input
                                    type="text"
                                    value={User.github}
                                    name="github"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="field">
                                <span>Linkedin:</span>
                                <input
                                    type="text"
                                    value={User.linkedin}
                                    name="linkedin"
                                    onChange={handleChange}
                                />
                            </div>
                            <button onClick={handleSubmit}>Save</button>
                        </div>

                        <div className="background-overlay"></div>
                    </div>
                )}
            </div>
            <div className="user-detail-outer-container">
                <div className="user-details">
                    <h2>Profile</h2>
                    <div className="field">
                        <span>UserName:</span>
                        <span>{user.user.username}</span>
                    </div>
                    <div className="field">
                        <span>Email:</span>
                        <span>{user.user.email}</span>
                    </div>
                    <div className="field">
                        <span>Experience:</span>
                        <span>{user.user.experience}</span>
                    </div>
                    <div className="field">
                        <span>Bio:</span>
                        <span>{user.user.bio}</span>
                    </div>
                    <div className="field">
                        <span>Education:</span>
                        <span>{user.user.education}</span>
                    </div>
                    <div className="field">
                        <span>Github:</span>
                        <span>{user.user.github}</span>
                    </div>
                    <div className="field">
                        <span>Linkedin:</span>
                        <span>{user.user.linkedin}</span>
                    </div>
                </div>
                <div className="connection-container">
                    <h2>Connections</h2>

                    {followeduserdata &&
                        followeduserdata.map((item, index) => {
                            return (
                                <div className="connection" key={index}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                        }}
                                    >
                                        <img src={item.profilephoto} alt="" />
                                        <span>{item.username}</span>
                                    </div>

                                    <span
                                        onClick={() => handleUnFollow(item._id)}
                                        id="follow"
                                    >
                                        Unfollow
                                    </span>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Profile;
