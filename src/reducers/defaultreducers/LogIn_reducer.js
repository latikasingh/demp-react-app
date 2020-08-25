import {LOGIN_SUCCESSFULL,LOGIN_ERROR,LOGOUT} from '../../action/type'
const INITIAL_STATE={
    token:"",
    userrole:"",
    email:"",
    error_msg:""
}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type)
    {
        case LOGIN_SUCCESSFULL:{
            return Object.assign({},state,{token:action.data.token,userrole:action.data.userrole,email:action.data.email})
        }
        case LOGIN_ERROR:{
            return Object.assign({},state,{error_msg:action.data.error_msg})
        }
        case LOGOUT:{
            return Object.assign({},state,{token:"",userrole:""})
        }
        default:
            return state;
    }
}