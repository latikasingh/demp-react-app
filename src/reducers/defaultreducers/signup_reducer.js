import {SIGNUP_SUCCESSFULL,SIGNUP_ERROR} from '../../action/type'
const INITIAL_STATE={
    username:"",
    error_msg:""
}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type)
    {
        case SIGNUP_SUCCESSFULL:{
            return Object.assign({},state,{username:action.data.username})
        }
        case SIGNUP_ERROR:{
            return Object.assign({},state,{error_msg:action.data.error_msg})
        }
        default:
            return state;
    }
}