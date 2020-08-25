import {VIEW_SUBCAT_SUCCESSFULL,VIEW_ERROR,GET_CATEGORY_BY_COURSE} from '../../action/type'

import * as View_SubCategoryService from '../../service/services'

export const View_AllSubCategory=(maincatname)=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
            View_SubCategoryService.View_SubCategory(maincatname)
            .then((response)=>{
                if(response.status===200)
                {
                    let SubCategoryList=response.data.map((value)=>{
                        return value.SubCategoryname
                    })
                    dispatch({
                        type:VIEW_SUBCAT_SUCCESSFULL,
                        data:{Data:SubCategoryList}
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

export const getCategoryName=(subcatid)=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
            View_SubCategoryService.getCategoryData(subcatid)
            .then((response)=>{
                 if(response.status===200)
                 {
                    dispatch({
                        type:GET_CATEGORY_BY_COURSE,
                        data:{Data:response.data}
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