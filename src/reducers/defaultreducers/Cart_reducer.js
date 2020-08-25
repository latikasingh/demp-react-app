import {ADD_CART_SUCCESSFULL,VIEW_CART_SUCCESSFULL,REMOVE_CART_PRODUCT_SUCCESSFULL} from '../../action/type'
const INITIAL_STATE={
    Data:[],
}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type)
    {
        case ADD_CART_SUCCESSFULL:{
            return Object.assign({},state,{Data:action.data.Data})
        }
        case VIEW_CART_SUCCESSFULL:{
            return Object.assign({},{Data:action.data.Data})
        }
        case REMOVE_CART_PRODUCT_SUCCESSFULL:{
            return Object.assign({},{Data:action.data.Data})
        }
        default:
            return state;
    }
}