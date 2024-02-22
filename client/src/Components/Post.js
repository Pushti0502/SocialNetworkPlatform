import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import '../Wrappers/dashboard.css';

const Posts = () => {
  const user = useSelector(state => state.user); 

    const [postData, setPostData] = useState({
        title: '',
        content: ' ',
        file: null
    });

    const [isPost, setIsPost] = useState(false);
   
    const [post, setPost] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPostData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handlePost = () => {
        setIsPost(!isPost);
        console.log(user)
       
    };

 

    const handleFileChange = (event) => {
        const fileList = event.target.files[0];
        
    
       

        
    };
    const handleUpload = () => {
        var data = {
            title: postData.title,
            content: postData.content,
            selectedFile:postData.file
        };
        axios.post('http://localhost:8000/post/createPost', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        alert('Post Created!!');
        setPostData({ title: '', content: '' });
        handlePost()
   
    };
    useEffect(() => {
        // Fetch files from the API
        axios
            .get('http://localhost:8000/post/getPosts')
            .then((response) => {
                // Update state with fetched files
                setPost(response.data);
            })
            .catch((error) => {
                console.error('Error fetching files:', error);
            });
    }, [post]);
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
                        {isPost ? (
                            <div className="upload-post">
                                <label>Title:</label>
                                <input
                                    placeholder="Enter title of Post"
                                    name="title"
                                    style={{}}
                                    onChange={handleChange}
                                    value={postData.title}
                                ></input>
                                <label>Content:</label>
                                <textarea
                                    style={{}}
                                    placeholder="Write Something"
                                    name="content"
                                    onChange={handleChange}
                                    value={postData.content}
                                ></textarea>
                            </div>
                        ) : (
                            <div className="images-container">
                                <img src="https://images.unsplash.com/photo-1682686581362-796145f0e123?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                                <img src="https://images.unsplash.com/photo-1682686581362-796145f0e123?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                                <img src="https://images.unsplash.com/photo-1682686581362-796145f0e123?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                                <img src="https://images.unsplash.com/photo-1682686581362-796145f0e123?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                            </div>
                        )}

                        {isPost && (
                            <div className="button-container">
                                <form
                                    method="POST"
                                    action="/createPost"
                                    enctype="multipart/form-data"
                                >
                                    <input
                                        type="file"
                                        placeholder="Photo"
                                        multiple
                                        className="post-button"
                                        onChange={handleFileChange}
                                    ></input>
                                </form>
                                <button
                                    className="post-button"
                                    onClick={() => {
                                        handleUpload();
                                    }}
                                >
                                    Post
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="post">
                {post.map((item) => {
                    return (
                        <div className="post-container">
                            <div className="header-container">
                                <img
                                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                    alt=""
                                    className="profile-picture"
                                />
                                <span>Pushti Shah</span>
                            </div>
                            <h2>{item.title}</h2>
                            <span
                                style={{ fontSize: '15px', marginLeft: '10px' }}
                            >
                                {item.content}
                            </span>
                            <img
                                src="https://images.unsplash.com/photo-1706066954162-d557cc64a163?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt=""
                                className="post-image"
                            />
                            <div className="like-container">
                                <span>Like</span>
                                <span>Comment</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Posts;
