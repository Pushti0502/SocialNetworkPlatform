const initialState = {
    user: null,
    savedPosts: [],
    followingData: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNUP':
            return {
                ...state,
                user: action.payload,
            };
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            };
        case 'GET_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'FOLLOW_USER':
            return {
                ...state,
                followingData: action.payload,
            };
        case 'UNFOLLOW_USER':
            return {
                ...state,
                followingData: action.payload,
            };
        case 'UPDATE_USER':
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
            return {
                ...state,
                user: action.payload,
            };
        case 'GET_SAVEDPOST':
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
