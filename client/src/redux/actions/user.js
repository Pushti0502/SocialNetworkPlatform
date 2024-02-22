import axios from 'axios';
export const LOGIN = 'LOGIN'
export const SIGNUP= 'SIGNUP'
export const LOGOUT='LOGOUT'
export const logIn = (user) => ({
    type: LOGIN,
    payload: user,
  });
  export const signUp =(user)=>({
    type: SIGNUP,
    payload:user
  })
  export const logOut=()=>({
    type:LOGOUT,
  
  })


  // export const signUpUser = (email, password, username) => async (dispatch) => {
  //   try {
  //     if (!(email && password && username)) {
  //       alert("Please fill all fields");
  //       return;
  //     }
      
  //     if (!/\S+@\S+\.\S+/.test(email)) {
  //       alert("Email is not valid");
  //       return;
  //     }
      
  //     if (password.length < 6) {
  //       alert("Password must be of minimum 6 characters");
  //       return;
  //     }
      
  //     const response = await axios.post('http://localhost:8000/user/signup', { email, password, username });
  //     dispatch(signUp(response.data));
  //   } catch (error) {
  //     console.log('SignUp error:', error);
  //     alert('Signup failed. Please try again.');
  //   }
  // };
  // export const logInUser = (email,password)=>async(dispatch)=>{
  //   try {
  //     if (!(email && password)) {
  //       alert("Please fill all fields");
  //       return;
  //     }
      
  //     if (!/\S+@\S+\.\S+/.test(email)) {
  //       alert("Email is not valid");
  //       return;
  //     }
      
  //     if (password.length < 6) {
  //       alert("Password must be of minimum 6 characters");
  //       return;
  //     }
  //       const response =await axios.post('http://localhost:8000/user/login',{email, password});
  //       dispatch(logIn(response.data))
  //       console.log("Login Sucessfull")
        
  //   } catch (error) {
  //       console.log(error)
  //   }
  // }
  // export const logOutUser= async(dispatch)=>{
  //      try {
  //       dispatch(logOut())
  //       console.log("LogOut")
  //      } catch (error) {
  //       console.log(error)
  //      }
  // }
  