import axios from 'axios';
import BASE_URL from '../../apiConfig/api';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_FAIL = 'CREATE_POST_FAIL';
export const GET_POST_REQUEST = 'GET_POST_REQUEST';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const GET_POST_FAIL = 'GET_POST_FAIL';
export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';
export const SEARCH_POST_FAILURE = 'SEARCH_POST_FAILURE';
export const SEARCH_POST_SUCCESS = 'SEARCH_POST_SUCCESS';
export const SEARCH_POST_REQUEST = 'SEARCH_POST_REQUEST';
export const SEARCH_POST = 'SEARCH_POST';
export const COMMENT_POST_REQUEST = 'COMMENT_POST_REQUEST';
export const COMMENT_POST_SUCCESS = 'COMMENT_POST_SUCCESS';
export const COMMENT_POST_FAILURE = 'COMMENT_POST_FAILURE';
export const GET_COMMENTS_REQUEST = 'GET_COMMENTS_REQUEST';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE';
export const DELETE_POST_FAIL = 'DELETE_POST_FAIL';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const createReq = () => ({
    type: CREATE_POST_REQUEST,
});
export const createSuccess = (postData) => ({
    type: CREATE_POST_SUCCESS,
    payload: postData,
});
export const createFail = (error) => ({
    type: CREATE_POST_FAIL,
    payload: error,
});
export const getPostReq = () => ({
    type: GET_POST_REQUEST,
});
export const getPostSuccess = (data) => ({
    type: GET_POST_SUCCESS,
    payload: data,
});
export const getPostFail = (error) => ({
    type: GET_POST_FAIL,
    payload: error,
});
export const searchPostReq = () => ({
    type: SEARCH_POST_REQUEST,
});
export const searchPostSuccess = (title) => ({
    type: SEARCH_POST_SUCCESS,
    payload: title,
});
export const searchPostFail = (error) => ({
    type: SEARCH_POST_FAILURE,
    payload: error,
});
export const updateReq = () => ({
    type: UPDATE_POST_REQUEST,
});
export const updatePostSuccess = (data) => ({
    type: UPDATE_POST_SUCCESS,
    payload: data,
});
export const updatePostFail = (error) => ({
    type: UPDATE_POST_FAILURE,
    payload: error,
});
export const commentPostReq = () => ({
    type: COMMENT_POST_REQUEST,
});
export const commentPostSuccess = (data) => ({
    type: COMMENT_POST_SUCCESS,
    payload: data,
});
export const commentpostFail = (error) => ({
    type: COMMENT_POST_FAILURE,
    payload: error,
});
export const getCommentsReq = () => ({
    type: GET_COMMENTS_REQUEST,
});
export const getCommentsSuccess = (data) => ({
    type: GET_COMMENTS_SUCCESS,
    payload: data,
});
export const getCommentsFail = (error) => ({
    type: GET_COMMENTS_FAILURE,
    payload: error,
});
export const deletePostSuccess = (data) => ({
    type: DELETE_POST_SUCCESS,
    payload: data,
});
export const deletePostReq = () => ({
    type: DELETE_POST_REQUEST,
});
export const deletePostFail = (error) => ({
    type: DELETE_POST_FAIL,
    payload: error,
});
export const likePostReq = () => ({
    type: LIKE_POST_REQUEST,
});
export const likePostSuccess = (data) => ({
    type: LIKE_POST_SUCCESS,
    payload: data,
});
export const likePostFail = (error) => ({
    type: LIKE_POST_FAILURE,
    payload: error,
});
export const createPost = (postData) => {
    return async (dispatch) => {
        dispatch(createReq());
        try {
            const response = await axios
                .post(`${BASE_URL}/post/createPost`, postData)
              
            const newPost = response.data.post;
            dispatch(createSuccess(newPost));
        } catch (error) {
            const errorMessage = error.message;
            dispatch(createFail(errorMessage));
        }
    };
};

export const getPostById = (userId) => {
    return async (dispatch) => {
        dispatch(getPostReq());
        try {
            const response = await axios.get(
                `${BASE_URL}/post/${userId}/getPostById`
            );
            const Post = response.data.posts;
            dispatch(getPostSuccess(Post));
        } catch (error) {
            const errorMessage = error.message;
            dispatch(getPostFail(errorMessage));
        }
    };
};
export const updatePost = (id, updatedFields) => {
    return async (dispatch) => {
        dispatch(updateReq());
        try {
            const response = await axios.patch(
                `${BASE_URL}/post/${id}/updatepost`,
                updatedFields
            );
            const updatedPost = response.data.post;
            dispatch(updatePostSuccess(updatedPost));
        } catch (error) {
            const errorMessage = error.message;
            dispatch(updatePostFail(errorMessage));
        }
    };
};
export const commentPost = (id, comment) => {
    return async (dispatch) => {
        dispatch(commentPostReq());
        try {
            const response = await axios.patch(
                `${BASE_URL}/post/${id}/commentPost`,

                { comment }
            );
            const updatedPost = response.data;
            alert('Comment successfull');
            dispatch(commentPostSuccess(updatedPost));
        } catch (error) {
            const errormessage = error.message;

            dispatch(commentpostFail(errormessage));
        }
    };
};
export const getComments = (id) => {
    return async (dispatch) => {
        dispatch(getCommentsReq());
        try {
            const response = await axios.get(
                `${BASE_URL}/post/${id}/getComments`
            );
            const comments = response.data;
            dispatch(getCommentsSuccess(comments));
        } catch (error) {
            const errormessage = error.message;
            dispatch(getCommentsFail(errormessage));
        }
    };
};
export const deletePost = (id) => {
    return async (dispatch) => {
        dispatch(deletePostReq());
        try {
            await axios.delete(`${BASE_URL}/post/${id}/deletePost`);
            dispatch(deletePostSuccess());
        } catch (error) {
            const errormessage = error.message;
            dispatch(deletePostFail(errormessage));
        }
    };
};
export const likePost = (userId, id) => {
    return async (dispatch) => {
        dispatch(likePostReq());
        try {
            await axios.patch(`${BASE_URL}/post/${userId}/likePost/${id}`);
            const response= await axios.get(
                `${BASE_URL}/user/${userId}/getfollowinguser`
            );
            dispatch(likePostSuccess(response.data));
            alert('Operation success!!');
        } catch (error) {
            const errormessage = error.message;
            dispatch(likePostFail(errormessage));
        }
    };
};
