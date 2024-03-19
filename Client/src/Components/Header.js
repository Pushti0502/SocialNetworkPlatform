import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followUsers, unfollowUsers, getUsers } from '../redux/actions/user';
import '../Wrappers/dashboard.css';
import { MdLogout } from 'react-icons/md';
import axios from 'axios';
const Header = ({ logOutFunc, onSearch }) => {
    const currentUserData = JSON.parse(localStorage.getItem('user'));

    const dispatch = useDispatch();
    const users =
        useSelector((state) => state.user.user) ||
        JSON.parse(localStorage.getItem('user'));
    const handleKeyChange = (event) => {
        if (event.key === 'Enter') {
            onSearch(searchQuery);
        }
    };
    const [searchQuery, setSearchquery] = useState('');
   
    const [clicked, setClicked] = useState(false);
    const [isFollowed, setIsFollowed] = useState();
    const [filteredUsers, setFilteredUsers] = useState([]);
    const handleFollow = (id) => {
        dispatch(followUsers(id, currentUserData._id));
    };
    const handleUnFollow = (id) => {
        dispatch(unfollowUsers(id, currentUserData._id));
    };

    const handleChange = (event) => {
        setSearchquery(event.target.value);
        filterUsers(event.target.value);
    };

    const handleClick = () => {
        setClicked(!clicked);
    };
    useEffect(() => {
     
        dispatch(getUsers())
    }, [dispatch]);
    const filterUsers = (query) => {
        const filtered = users.user.filter((user) =>
            user.username.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    return (
        <div className="header-box">
            <header>CodeQuest</header>
            <input
                type="text"
                placeholder="Search for users"
                onClick={handleClick}
                value={searchQuery}
                onChange={handleChange}
                onKeyDown={handleKeyChange}
            />

            <div className="header-right-section">
                <MdLogout size={35} onClick={logOutFunc} />
            </div>
            {clicked && (
                <div className="user-container">
                    {filteredUsers.map((user, index) => {
                        return (
                            <div key={index} className="user-list-card">
                                <span key={index}>{user.username}</span>
                                <span
                                    id="unfollow"
                                    onClick={() => {
                                        handleFollow(user._id);
                                    }}
                                >
                                  Follow
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Header;
