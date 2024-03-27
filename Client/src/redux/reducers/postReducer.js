const initialState = {
    error: '',
    loading: false,
    post: [],
    comments:[]
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
                action.payload,
                state.post
            );
            return {
                ...state,
                loading: false,
                post: [ ...state.post, action.payload],
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

            const commentedPost = action.payload;
            const updatedPosts = state.post.map((post) =>
              post._id === commentedPost._id ? commentedPost : post
            );
            return {
              ...state,
              loading: false,
              post: updatedPosts,
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
            return {
                ...state,
                loading: false,
                comments: action.payload,
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

                const likedPost = action.payload;
                const updatedpostdata = state.post.map((post) =>
                  post._id === likedPost._id ? likedPost : post
                );
                return {
                  ...state,
                  loading: false,
                  post:updatedpostdata,
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
