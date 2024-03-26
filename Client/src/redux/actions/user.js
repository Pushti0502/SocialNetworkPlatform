import axios from 'axios';
import BASE_URL from '../../apiConfig/api';

export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';
export const SETUSER = 'SETUPUSER';
export const UPDATE = 'UPDATE';
export const GET_USER = 'GET_USER';
export const FOLLOW_USER = 'FOLLOW_USER';
export const UNFOLLOW_USER = 'UNFOLLOW_USER';
export const SAVE_UNSAVE_POST = 'SAVE/UNSAVE_POST';
export const GET_SAVEDPOST = 'GET_SAVEDPOST';
export const UNSAVE_POST = 'UNSAVE_POST';
export const GET_FOLLOWINGUSER_DATA = 'GET_FOLLOWINGUSER_DATA';
export const GET_USER_BY_ID='GET_USER_BY_ID'

export const logIn = (user) => ({
    type: LOGIN,
    payload: user,
});
export const signUp = (user) => ({
    type: SIGNUP,
    payload: user,
});
export const logOut = () => ({
    type: LOGOUT,
});
export const setUser = (user) => ({
    type: SETUSER,
    payload: user,
});
export const update = (user) => ({
    type: UPDATE,
    payload: user,
});
export const getUser = (user) => ({
    type: GET_USER,
    payload: user,
});
export const followUser = (user) => ({
    type: FOLLOW_USER,
    payload: user,
});
export const unfollowUser = (user) => ({
    type: UNFOLLOW_USER,
    payload: user,
});
export const saveUnsavePosts = (data) => ({
    type: SAVE_UNSAVE_POST,
    payload: data,
});
export const fetchSavedPost = (data) => ({
    type: GET_SAVEDPOST,
    payload: data,
});
export const unsavePost = (id) => ({
    type: UNSAVE_POST,
    payload: id,
});
export const getFollowinguserdata = (data) => ({
    type: GET_FOLLOWINGUSER_DATA,
    payload: data,
});
export const getUserById = (data)=>({
    type:GET_USER_BY_ID,
    payload:data
})

export const signUpUser =
    (
        email,
        password,
        username,
        followers,
        following,
        bio,
        linkedin,
        github,
        education,
        experience,
        profilephoto
    ) =>
    async (dispatch) => {
        try {
            const response = await axios.post(`${BASE_URL}/user/signup`, {
                email,
                password,
                username,
                followers,
                following,
                bio,
                linkedin,
                github,
                education,
                experience,
                profilephoto,
            });
            const user = response.data.user;
            console.log(user,"user")
            dispatch(signUp(user));
           
        } catch (error) {
            console.log('SignUp error:', error);
            alert('Signup failed. Please try again.');
        }
    };
export const logInUser = (email, password) => async (dispatch) => {
    try {
        const response = await axios
            .post(`${BASE_URL}/user/login`, {
                email,
                password,
            })
           const user = response.data.user
        dispatch(logIn(user));
     
    } catch (error) {
        console.log(error);
    }
};
export const updateUser = (userId, updatedFields) => async (dispatch) => {
    try {
        const response = await axios.patch(
            `${BASE_URL}/user/${userId}/update`,
            updatedFields
        );
        const updatedUser = response.data.user;
        dispatch(update(updatedUser));
        alert('User Updated');
       
    } catch (error) {
        console.log('Error:', error.message);
        alert('Error while updating user');
    }
};

export const getUsers = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${BASE_URL}/user/getusers`);
            const users = response.data.user;
            dispatch(getUser(users));
        } catch (error) {
            console.log(error.message);
            alert('Error in fetching users');
        }
    };
};

export const logOutUser = async (dispatch) => {
    try {
        dispatch(logOut());
        console.log('LogOut');
       
    } catch (error) {
        console.log(error);
    }
};
export const followUsers = (userId, currentuserId) => async (dispatch) => {
    try {
        await axios
            .patch(`${BASE_URL}/user/${userId}/follow`, {
                currentUserId: currentuserId,
            })
            .then((response) => {
                console.log(response.data.user);
                dispatch(followUser(response.data.user));
            });
    } catch (error) {
        console.log('Error occurred while unfollowing user:', error.message);
        alert('Unable to follow user');
    }
};

export const unfollowUsers = (userId, currentuserId) => async (dispatch) => {
    try {
        await axios
            .patch(`${BASE_URL}/user/${userId}/unfollow`, {
                currentUserId: currentuserId,
            })
            .then((response) => {
               
                dispatch(unfollowUser(response.data.user));
            });
    } catch (error) {
        console.log('Error occurred while unfollowing user:', error);
        alert('Unable to unfollow user');
    }
};

export const saveUnsavePost = (id, userId) => async (dispatch) => {
    try {
        const response = await axios.patch(
            `${BASE_URL}/user/${userId}/saveunsavepost/${id}`
        );
        dispatch(saveUnsavePosts(response.data.user));
        alert('Operation successfull!!');
    } catch (error) {
        console.log(error.message);

        alert('Fail to save Post');
    }
};
export const getSavedPost = (userId) => async (dispatch) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/user/${userId}/getsavedposts`
        );
        dispatch(fetchSavedPost(response.data.posts));
    } catch (error) {
        console.log(error);
    }
};
export const getFollowingData = (userId) => async (dispatch) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/user/${userId}/getfollowinguser`
        );

        const userdata = response.data.user;
        dispatch(getFollowinguserdata(userdata));
    } catch (error) {
        console.log(error);
    }
};
export const getUserDataById = (userId)=> async(dispatch)=>{
    try {
        const response = await axios.get(`${BASE_URL}/user/${userId}/getuserbyid`);
        const userdata= response.data.user;
        dispatch(getUserById(userdata))
        
    } catch (error) {
        console.log(error)
        
    }
}
