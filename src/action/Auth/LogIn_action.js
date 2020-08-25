import {LOGIN_SUCCESSFULL,LOGIN_ERROR,LOGOUT} from '../../action/type'

import * as View_AuthService from '../../service/services'

export const Login_user=(credentails)=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
            View_AuthService.LogIn(credentails)
            .then((response)=>{
                if(response.status===200)
                {
                    localStorage.setItem("token",response.data.token)
                    localStorage.setItem("userrole",response.data.userrole)
                        dispatch({
                            type:LOGIN_SUCCESSFULL,
                            data:{token:response.data.token,userrole:response.data.userrole,email:response.data.email}
                        })
                        return resolve(response.data);
                }
            })
            .catch((error)=>{
                if(error){
                    dispatch({
                        type:LOGIN_ERROR,
                        data:{error_msg:error.response.data}
                    })
                }
                return reject(error.response.data)
            })
        })
    }
}
export const Logout_User=()=>{
    return(dispatch)=>{
        dispatch({
            type:LOGOUT
        });
        localStorage.removeItem("token");
        localStorage.removeItem("userrole");
    }
}