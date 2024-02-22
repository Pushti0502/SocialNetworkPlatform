
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import DashBoard from './Pages/DashBoard';
import Profile from './Pages/Profile';
import Error from './Components/Error';
function App() {
  return (
 
<BrowserRouter>
  <Routes>
    <Route path="/" element={<SignUp/>}/>
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Error />} />
 
  </Routes>
</BrowserRouter>
  );
}

export default App;
