const initialState = {
    user: {},
    savedPosts: [],
    followingData: [],
    allusers: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNUP':
            console.log('User received in reducer:', action.payload);
            return {
                ...state,
                user: action.payload,
            };
        case 'LOGIN':
            console.log('User received in reducer login:', action.payload);
            return {
                ...state,
                user: action.payload,
            };
        case 'GET_USER_BY_ID':
            return {
                ...state,
                user: action.payload,
            };
        case 'GET_USER':
            console.log('User received in reducer: getusers', action.payload);
            return {
                ...state,
                allusers: action.payload,
            };
        case 'FOLLOW_USER':
            console.log(
                'User received in reducer: follow users',
                action.payload
            );
            return {
                ...state,
                followingData: action.payload,
            };
        case 'UNFOLLOW_USER':
            console.log(
                'User received in reducer: unfollow users',
                action.payload
            );
            return {
                ...state,
                followingData: action.payload,
            };
        case 'UPDATE_USER':
            console.log(
                'User received in reducer: update user',
                action.payload
            );
            return {
                ...state,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            };
        case 'SAVE/UNSAVE_POST':
            console.log(
                'User received in reducer: save/unsave',
                action.payload
            );
            return {
                ...state,
                user: action.payload,
            };
        case 'GET_SAVEDPOST':
            console.log(
                'User received in reducer get saved posts:',
                action.payload
            );
            return {
                ...state,
                savedPosts: action.payload,
            };
        case 'GET_FOLLOWINGUSER_DATA':
            return {
                ...state,
                followingData: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
