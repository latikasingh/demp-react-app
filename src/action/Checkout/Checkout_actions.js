import {CHECKOUT_SUCCESSFULL,CHECKOUT_ERROR} from '../../action/type'

import * as View_CheckoutService from '../../service/services'

export const Checkout_user=(data)=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
            View_CheckoutService.Checkout(data)
            .then((response)=>{
                if(response.status===200)
                {
                        dispatch({
                            type:CHECKOUT_SUCCESSFULL,
                            data:response.data
                        })
                        return resolve(response.data);
                }
            })
            .catch((error)=>{
                if(error){
                    dispatch({
                        type:CHECKOUT_ERROR,
                        data:{error_msg:error.response.data}
                    })
                }
                return reject(error.response.data)
            })
        })
    }
}