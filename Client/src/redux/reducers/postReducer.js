const initialState = {
    error: '',
    loading: false,
    post: [],
};
const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_POST_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'CREATE_POST_SUCCESS':
            console.log(
                'User received in reducer create post success',
                action.payload
            );
            return {
                ...state,
                loading: false,
                post: [...state.post, action.payload],
            };
        case 'CREATE_POST_FAIL':
            console.log(
                'User received in reducer create post fail',
                action.payload
            );
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
            console.log(
                'User received in reducer get post fail',
                action.payload
            );
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
            console.log(
                'User received in reducer update post ',
                action.payload
            );
            const updatedposts = state.post.map((post) => {
                if (post._id === action.payload._id) {
                    return action.payload;
                } else {
                    return post;
                }
            });

            return {
                ...state,
                loading: false,
                post: updatedposts,
            };

        case 'UPDATE_POST_FAIL':
            console.log(
                'User received in reducer get comment fail:',
                action.payload
            );
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
            console.log(
                'User received in reducer comment post ',
                action.payload
            );
            const updatedPost = action.payload;
            const updatedPosts = state.post.map((post) =>
                post._id === updatedPost._id ? updatedPost : post
            );
            return {
                ...state,
                loading: false,
                error: '',
                posts: updatedPosts,
            };

        case 'COMMENT_POST_FAILURE':
            console.log(
                'User received in reducer get comment fail:',
                action.payload
            );
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
            console.log(
                'User received in reducer get comment posts:',
                action.payload
            );
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
            console.log(
                'User received in reducer get post posts:',
                action.payload
            );
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
            console.log(
                'User received in reducer get like posts:',
                action.payload
            );
            return {
                ...state,
                loading: false,
                post: action.payload,
            };
        case 'LIKE_POST_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
export default postReducer;
