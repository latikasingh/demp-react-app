import {VIEW_MAINCAT_SUCCESSFULL,VIEW_ERROR} from '../../action/type'

import * as View_MainCategoryService from '../../service/services'

export const View_AllMainCategory=()=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
            View_MainCategoryService.View_MainCategory()
            .then((response)=>{
                if(response.status===200)
                {
                    let MainCategoryList=response.data.map((value)=>{
                        return value.MainCategoryname
                    })
                    dispatch({
                        type:VIEW_MAINCAT_SUCCESSFULL,
                        data:{Data:MainCategoryList}
                    })
                }
                return resolve(response.data);
            })
            .catch((error)=>{
                if(error){
                    dispatch({
                        type:VIEW_ERROR,
                        data:{error_msg:error.response.data}
                    })
                }
                return reject(error.response.data)
            })
        })
    }
}