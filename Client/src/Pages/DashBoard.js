import React,{useState} from 'react';
import Posts from '../Components/Post';
import Header from '../Components/Header';
import Menu from '../Components/Menu';
import Connections from '../Components/Connection';
import '../Wrappers/dashboard.css';
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logOut } from '../redux/actions/user';
const DashBoard = () => {
    const dispatch = useDispatch();
    const [searchQuery,setSearchQuery]=useState('')
    const navigate =useNavigate()
    const handleSearch =(query)=>{
        setSearchQuery(query)
    }
    const handlelogOut=()=>{
        dispatch(logOut)
        navigate('/login')
        alert('Logged Out')
    }
    return (
        <div className='dashboard'>
             <Header logOutFunc={handlelogOut} onSearch={handleSearch}/>
            <div className="dashboard-container">
                <Menu />
                <Posts searchQuery={searchQuery}/>
                <Connections />
            </div>
        </div>
    );
};

export default DashBoard;
