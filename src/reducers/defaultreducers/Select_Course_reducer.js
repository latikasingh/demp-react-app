import {SELECT_COURSE_SUCCESSFULL,VIEW_ERROR} from '../../action/type'
const INITIAL_STATE={
    Data:{},
}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type)
    {
        case SELECT_COURSE_SUCCESSFULL:{
            return Object.assign({},state,{Data:action.data.Data})
        }
        case VIEW_ERROR:{
            return Object.assign({},state,{error_msg:action.data.error_msg})
        }
        default:
            return state;
    }
}