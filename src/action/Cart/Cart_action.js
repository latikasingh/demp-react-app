import jwt from 'jwt-simple'
import {ADD_CART_SUCCESSFULL,ADD_CART_ERROR,VIEW_CART_SUCCESSFULL,REMOVE_CART_PRODUCT_SUCCESSFULL} from '../../action/type'

//import * as View_SectionService from '../../service/services'

export const addproducttocart=(cartproduct)=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
            let NewCart=[]
            if(localStorage.getItem('CartProduct')){
                NewCart = JSON.parse(jwt.decode(localStorage.getItem('CartProduct'),'secret'));
            }
            NewCart.push(cartproduct)
            localStorage.setItem('CartProduct',jwt.encode(JSON.stringify(NewCart),'secret'))
            dispatch({type:ADD_CART_SUCCESSFULL,data:{Data:NewCart}})
            return resolve();
        })
    }
}
export const viewcartproduct=()=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
            let products=[]
            if(localStorage.getItem('CartProduct')){
                products = JSON.parse(jwt.decode(localStorage.getItem('CartProduct'),'secret'));
            }
            dispatch({type:VIEW_CART_SUCCESSFULL,data:{Data:products}})
            return resolve();
        })
    }
}
export const removecartproduct=(cartproduct)=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
            let TotalCatproduct = JSON.parse(jwt.decode(localStorage.getItem('CartProduct'),'secret'));
            let newcartproducts = TotalCatproduct.filter(product => product._id !== cartproduct._id );
            localStorage.setItem('CartProduct', jwt.encode(JSON.stringify(newcartproducts),'secret'));
            if(JSON.parse(jwt.decode(localStorage.getItem('CartProduct'),'secret')).length==0){
                localStorage.removeItem('CartProduct')
            }
            dispatch({type:REMOVE_CART_PRODUCT_SUCCESSFULL,data:{Data:newcartproducts}})
            return resolve();
        })
    }
}
