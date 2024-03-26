// Connections.js
import React, { useState, useEffect } from 'react';
import '../Wrappers/dashboard.css';
import { getFollowingData, unfollowUsers } from '../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
const Connections = () => {
    const [isFollow, setIsFollow] = useState(true);
    const followeduserdata = useSelector((state) => state.user.followingData);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        // dispatch(getFollowingData(user._id));
        console.log(user, 'Follwoing ');
    }, [dispatch, followeduserdata]);

    const handleUnFollow = (id) => {
        dispatch(unfollowUsers(id, user._id));
    };

    return (
        <div className="connections">
            <h2>My Connections</h2>

            {followeduserdata &&
                followeduserdata.map((item, index) => {
                    return (
                        <div className="connection-card" key={index}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                }}
                            >
                                <img
                                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                    alt=""
                                    className="profile-picture"
                                />
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
    );
};

export default Connections;
