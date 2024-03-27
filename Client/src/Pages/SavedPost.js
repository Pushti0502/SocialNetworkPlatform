import React, { useEffect } from 'react';
import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import {
    getSavedPost,
    getUserDataById,
    saveUnsavePost,
} from '../redux/actions/user';
import { getPostById } from '../redux/actions/post';
import axios from 'axios';
import '../Wrappers/dashboard.css';
const SavedPost = () => {
    const user = useSelector((state) => state.user.user);
    const savedPosts = useSelector((state) => state.user.savedPosts);
    const dispatch = useDispatch();
    const handleUnSave = (id) => {
        dispatch(saveUnsavePost(id, user._id));
    };

    useEffect(() => {
        if (user) {
            dispatch(getUserDataById(user._id));
            dispatch(getSavedPost(user._id));
        }
    }, [dispatch, user, savedPosts]);

    return (
        <div className="savedpost-container">
            {savedPosts.length === 0 ? (
                <h1>No Saved Post</h1>
            ) : (
                <h1>Saved Posts</h1>
            )}

            {savedPosts && (
                <div className="post">
                    {savedPosts.map((item, index) => {
                        return (
                            <div className="post-container" key={index}>
                                <div className="header-outer-container">
                                    <div className="header-container">
                                        <img
                                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                            alt=""
                                            className="profile-picture"
                                        />
                                        <span>{user.username}</span>
                                    </div>
                                    <button
                                        onClick={() => handleUnSave(item._id)}
                                    >
                                        Unsave
                                    </button>
                                </div>
                                <h2>{item.title}</h2>
                                <span
                                    style={{
                                        fontSize: '15px',
                                        marginLeft: '10px',
                                    }}
                                >
                                    {item.content}
                                </span>
                                <img
                                    src="https://images.unsplash.com/photo-1706066954162-d557cc64a163?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt=""
                                    className="post-image"
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SavedPost;
