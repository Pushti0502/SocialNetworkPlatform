import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import DashBoard from './Pages/DashBoard';
import Profile from './Pages/Profile';
import Error from './Components/Error';
import SavedPost from './Pages/SavedPost';

function App() {
    const user = useSelector((state) => state.user.user);

    return (
        <BrowserRouter>
            <Routes>
                {user ? (
                    <Route key="dashboard" path="/" element={<DashBoard />} />
                ) : (
                    <Route key="signup" path="/" element={<SignUp />} />
                )}
                <Route key="profile" path="/profile" element={<Profile />} />
                <Route key="dashboard" path="/dashboard" element={<DashBoard />} />
                <Route key="signup" path="/signup" element={<SignUp />} />
                <Route key="login" path="/login" element={<Login />} />
                <Route key="savedPosts" path="/savedPosts" element={<SavedPost />} />
                <Route key="error" path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
