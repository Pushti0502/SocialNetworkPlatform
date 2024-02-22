import action from '../actions/post.js'
const initialState={
    post:null,
}
const postReducer=(state =initialState,action)=>{
    switch(action.type){
        case 'CREATE_POST':
            return{
                ...state,
                post:[...state.post,action.payload]
            }

        case 'GET_POST':
            return{
                ...state
            }
            default:
                return state;
    }
}
export default postReducer
