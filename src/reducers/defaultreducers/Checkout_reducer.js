import {CHECKOUT_SUCCESSFULL,CHECKOUT_ERROR} from '../../action/type'
const INITIAL_STATE={
    Data:{},
}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type)
    {
        case CHECKOUT_SUCCESSFULL:{
            return Object.assign({},state,{Data:action.data})
        }
        case CHECKOUT_ERROR:{
            return Object.assign({},state,{error_msg:action.data.error_msg})
        }
        default:
            return state;
    }
}