const initialState = {
    error: '',
    loading: false,
    post: []
};
const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_POST_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'CREATE_POST_SUCCESS':
            return {
                ...state,
                loading: false,
                post: action.payload
            };
        case 'CREATE_POST_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case 'GET_POST_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'GET_POST_SUCCESS':
            return {
                ...state,
                loading: false,
                post: action.payload,
            };
        case 'GET_POST_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case 'UPDATE_POST_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'UPDATE_POST_SUCCESS':
            const { id, newData } = action.payload;
            return {
                ...state,
                loading: false,
                post: state.post.map((post) => {
                    if (post._id === id) {
                        return { ...post, ...newData };
                    }
                    return post;
                }),
            };
        case 'UPDATE_POST_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'COMMENT_POST_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'COMMENT_POST_SUCCESS':
            const updatedPost = action.payload;
            const updatedPosts = state.post.map(post => post._id === updatedPost._id ? updatedPost : post);
            return {
              ...state,
              loading: false,
              error: '',
              posts: updatedPosts
            };

        case 'COMMENT_POST_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'GET_COMMENTS_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'GET_COMMENTS_SUCCESS':
            const post = action.payload;
            return {
                ...state,
                loading: false,
                post: state.post.map((currentPost) => {
                    if (currentPost._id === post._id) {
                        return { ...currentPost, comments: post.comments };
                    }
                    return currentPost;
                }),
            };

        case 'GET_COMMENTS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'DELETE_POST_SUCCESS':
            const postId = action.payload;
            return {
                ...state,
                post: state.post.filter((post) => post._id !== postId),
            };
        case 'DELETE_POST_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'LIKE_POST_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'LIKE_POST_SUCCESS':
            return {
                ...state,
                loading: false,
                post: action.payload
            };
        case 'LIKE_POST_FAILURE':
            return {
                ...state,
                loading: false,
                error:action.payload
            };
        default:
            return state;
    }
};
export default postReducer;
