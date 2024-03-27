import React, { useEffect, useState } from 'react';
import { CiHeart, CiSaveDown2 } from 'react-icons/ci';
import { FaHeart, FaRegComment } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import '../Wrappers/dashboard.css';
import {
    commentPost,
    createPost,
    deletePost,
    getComments,
    getPostById,
    likePost,
    updatePost,
} from '../redux/actions/post';
import { saveUnsavePost, getUserDataById } from '../redux/actions/user';
const Posts = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const [postData, setPostData] = useState({
        title: '',
        content: '',
        selectedFile: '',
        comments: [],
    });
    const postdata = useSelector((state) => state.post.post);
    const loading = useSelector((state) => state.post.loading);
    const error = useSelector((state) => state.post.error);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [editedPost, setEditedPost] = useState({});
    const [isPost, setIsPost] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isComment, setIsComment] = useState(false);
    const [comment, setComment] = useState();
    useEffect(() => {
        if (user && user._id) {
            dispatch(getPostById(user._id));
        }
    }, [dispatch, postdata, user]);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPostData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditedPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    };
    const handlePost = () => {
        setIsPost(!isPost);
    };
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleLike = (id) => {
        dispatch(likePost(user._id, id));
    };

    const handleEdit = (id) => {
        const postToEdit = postdata.find((post) => post._id === id);

        setEditedPost(postToEdit);
    };

    const handleUpdate = () => {
        dispatch(
            updatePost(editedPost._id, {
                title: editedPost.title,
                content: editedPost.content,
            })
        );
        setIsEdit(!isEdit);
    };
    const handleIsComment = () => {
        setIsComment(!isComment);
    };
    const handleComment = (id, comment) => {
        dispatch(getComments(id));
        dispatch(commentPost(id, comment));
    };
    const handlePostSave = (id) => {
        dispatch(saveUnsavePost(id, user._id));
    };
    const handleFileChange = (event) => {
        const { files } = event.target;
        if (files.length > 0) {
            const file = files[0];
            const fileName = `uploads/${Date.now()}-${file.name}`;
            console.log(fileName, "FilePath");
            setPostData({
                ...postData,
                selectedFile: fileName,
            });
        } else {
            setPostData({
                ...postData,
                selectedFile: '',
            });
        }
    };
    
    
    
    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('title', postData.title);
            formData.append('content', postData.content);
            formData.append('createdBy', user._id );
            console.log(postData.selectedFile,"selectedFile")
           
            formData.append('selectedFile', postData.selectedFile);
          
           dispatch(createPost(formData))
    
     
            handlePost();
            setPostData({ title: '', content: '', selectedFile: '' });
        } catch (error) {
            console.error('Error uploading post:', error);
          
        }
    };
    
    const handledelete = (PostId) => {
        dispatch(deletePost(PostId));
    };

    return (
        <div className="posts">
            <div className="search-container">
                <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    alt=""
                />
                <input
                    type="text"
                    placeholder="Post Something?"
                    onClick={() => {
                        handlePost();
                    }}
                />
            </div>
            <hr className="solid" />

            {isPost && (
                <div className="photo-overlay">
                    <div className="photo-container">
                        <div className="upload-post">
                            <span
                                className="close-upload-icon"
                                onClick={() => {
                                    handlePost();
                                }}
                            >
                                X
                            </span>
                            <label>Title:</label>
                            <input
                                placeholder="Enter title of Post"
                                name="title"
                                onChange={handleChange}
                                value={postData.title}
                            ></input>
                            <label>Content:</label>
                            <textarea
                                placeholder="Write Something"
                                name="content"
                                onChange={handleChange}
                                value={postData.content}
                            ></textarea>
                        </div>

                        {isPost && (
                            <div className="button-container">
                                <form>
                                    <input
                                        type="file"
                                        name="selectedFile"
                                        placeholder="Photo"
                                        multiple
                                        className="post-button"
                                        onChange={handleFileChange}
                                    ></input>
                                </form>
                                <button
                                    className="post-button"
                                    onClick={handleUpload}
                                >
                                    Post
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div>
                {postdata.length === 0 ||
                postdata === null ||
                postdata === undefined ? (
                    <p>No Posts</p>
                ) : (
                    <div className="post">
                        {postdata &&
                            postdata.map((item, index) => {
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
                                            <div className="button-container">
                                                <button
                                                    onClick={() => {
                                                        setIsEdit(!isEdit);
                                                        handleEdit(item._id);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handledelete(item._id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>

                                            {isEdit && (
                                                <div className="edit-photo-overlay">
                                                    <div className="photo-container">
                                                        <div className="upload-post">
                                                            <span
                                                                className="close-icon"
                                                                onClick={() => {
                                                                    setIsEdit(
                                                                        !isEdit
                                                                    );
                                                                }}
                                                            >
                                                                X
                                                            </span>
                                                            <label>
                                                                Title:
                                                            </label>
                                                            <input
                                                                placeholder="Enter title of Post"
                                                                name="title"
                                                                onChange={
                                                                    handleEditChange
                                                                }
                                                                value={
                                                                    editedPost.title
                                                                }
                                                            ></input>
                                                            <label>
                                                                Content:
                                                            </label>
                                                            <textarea
                                                                placeholder="Write Something"
                                                                name="content"
                                                                onChange={
                                                                    handleEditChange
                                                                }
                                                                value={
                                                                    editedPost.content
                                                                }
                                                            ></textarea>
                                                        </div>

                                                        {isEdit && (
                                                            <div className="button-container">
                                                                <form>
                                                                    <input
                                                                        type="file"
                                                                        name="selectedFile"
                                                                        placeholder="Photo"
                                                                        multiple
                                                                        className="post-button"
                                                                        onChange={
                                                                            handleEditChange
                                                                        }
                                                                    ></input>
                                                                </form>
                                                                <button
                                                                    className="post-button"
                                                                    onClick={() => {
                                                                        handleUpdate();
                                                                    }}
                                                                >
                                                                    Update
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
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
                                        {item.selectedFile && (
                                            <img
                                                src={`http://localhost:8000/${item.selectedFile}`}
                                                alt=""
                                                className="post-image"
                                            />
                                        )}
                                        <div className="like-container">
                                            <div className="likes">
                                                {item.likes.includes(
                                                    user._id
                                                ) ? (
                                                    <FaHeart
                                                        size={20}
                                                        color="red"
                                                        onClick={() =>
                                                            handleLike(item._id)
                                                        }
                                                    />
                                                ) : (
                                                    <CiHeart
                                                        size={20}
                                                        onClick={() =>
                                                            handleLike(item._id)
                                                        }
                                                    />
                                                )}
                                            </div>

                                            <div
                                                className="likes"
                                                onClick={handleIsComment}
                                            >
                                                <FaRegComment size={20} />
                                                <span>Comment</span>
                                            </div>
                                            {isComment && (
                                                <div className="edit-photo-overlay">
                                                    <div className="comment-box">
                                                        <span
                                                            className="close-icon"
                                                            onClick={
                                                                handleIsComment
                                                            }
                                                        >
                                                            X
                                                        </span>
                                                        {item.comments.map(
                                                            (data, index) => (
                                                                <div
                                                                    key={index}
                                                                >
                                                                    {data}
                                                                </div>
                                                            )
                                                        )}
                                                        <form>
                                                            <label>
                                                                Write Comment
                                                            </label>
                                                            <textarea
                                                                onChange={
                                                                    handleCommentChange
                                                                }
                                                            ></textarea>

                                                            <button
                                                                onClick={() =>
                                                                    handleComment(
                                                                        item._id,
                                                                        comment
                                                                    )
                                                                }
                                                            >
                                                                Post
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            )}

                                            <div
                                                className="likes"
                                                onClick={() =>
                                                    handlePostSave(item._id)
                                                }
                                            >
                                                <CiSaveDown2 size={20} />
                                                <span>Save</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Posts;
