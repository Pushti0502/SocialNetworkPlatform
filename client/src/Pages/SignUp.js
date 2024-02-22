// SignUp.js
import React, { useState } from 'react';
import '../Wrappers/signUp.css'; // Import your CSS file
import { useDispatch, useSelector } from 'react-redux';
import {signUp} from '../redux/actions/user.js'
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const loginWithGoogle = () => {
        window.open('http://localhost:8000/user/auth/google/callback', '_self');
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: '', email: '', password: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(signUp(user.email, user.password, user.username));
        navigate('/dashboard');
        console.log('succesffullyy signup');
    };
    return (
        <div className="signup">
            <h1>Sign Up to CodeQuest</h1>
            <form className="signup-container">
                <label htmlFor="userName">UserName:</label>
                <input
                    type="text"
                    id="userName"
                    placeholder="Enter your username"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                />
                <button type="submit" onClick={handleSubmit}>
                    SignUp
                </button>
            </form>
            <div className="bottom-container">
                <span>Already have an account? </span>
                <a href="/login">LogIn</a>
            </div>

            <button
                className="google-button"
                id="signup-button"
                onClick={loginWithGoogle}
            >
                SignUp with Google
            </button>
            <h4>or</h4>
            <h4>Signup with GitHub</h4>
        </div>
    );
};

export default SignUp;
