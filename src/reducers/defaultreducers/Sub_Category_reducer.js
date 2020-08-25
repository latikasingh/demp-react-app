import {VIEW_SUBCAT_SUCCESSFULL,VIEW_ERROR,GET_CATEGORY_BY_COURSE} from '../../action/type'
const INITIAL_STATE={
    Data:[],
    catgoryAll:{}
}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type)
    {
        case VIEW_SUBCAT_SUCCESSFULL:{
            return Object.assign({},state,{Data:action.data.Data})
        }
        case VIEW_ERROR:{
            return Object.assign({},state,{error_msg:action.data.error_msg})
        }
        case GET_CATEGORY_BY_COURSE:{
            return Object.assign({},state,{catgoryAll:action.data.Data})
        }
        default:
            return state;
    }
}