import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUserFromLocalStorage } from './redux/actions/user';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import DashBoard from './Pages/DashBoard';
import Profile from './Pages/Profile';
import Error from './Components/Error';
import SavedPost from './Pages/SavedPost';
function App() {
    const dispatch = useDispatch();
    const user =
        useSelector((state) => state.user.user) || localStorage.getItem('user');

    return (
        <BrowserRouter>
            <Routes>
                {user ? (
                    <Route path="/" element={<DashBoard />} />
                ) : (
                    <Route path="/" element={<SignUp />} />
                )}

                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/savedPosts" element={<SavedPost />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
