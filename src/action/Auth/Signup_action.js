import {SIGNUP_SUCCESSFULL,SIGNUP_ERROR} from '../../action/type'

import * as View_AuthService from '../../service/services'

export const Signup_user=(credentails)=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
            View_AuthService.signup(credentails)
            .then((response)=>{
                if(response.status===200)
                {
                        dispatch({
                            type:SIGNUP_SUCCESSFULL,
                            data:{username:response.data.fullname}
                        })
                }
                return resolve(response.data);
            })
            .catch((error)=>{
                if(error){
                    dispatch({
                        type:SIGNUP_ERROR,
                        data:{error_msg:error.response.data}
                    })
                }
                return reject(error.response.data)
            })
        })
    }
}