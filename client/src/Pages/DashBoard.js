import React from 'react';
import Posts from '../Components/Post';
import Header from '../Components/Header';
import Menu from '../Components/Menu';
import Connections from '../Components/Connection';
import '../Wrappers/dashboard.css';
import {useDispatch} from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { logOut } from '../redux/actions/user';
const DashBoard = () => {
    const dispatch = useDispatch();
    const navigate =useNavigate()
    const handlelogOut=()=>{
        dispatch(logOut)
        navigate('/login')
        alert('Logged Out')
    }
    return (
        <div className='dashboard'>
             <Header logOutFunc={handlelogOut}/>
            <div className="dashboard-container">
                <Menu />
                <Posts />
                <Connections />
            </div>
        </div>
    );
};

export default DashBoard;
