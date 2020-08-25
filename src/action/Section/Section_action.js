import {VIEW_SECTION_SUCCESSFULL,VIEW_ERROR} from '../../action/type'

import * as View_SectionService from '../../service/services'

export const View_SectionDetail=(title)=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
            View_SectionService.Section_Detail(title)
            .then((response)=>{
                if(response.status===200)
                {
                        dispatch({
                            type:VIEW_SECTION_SUCCESSFULL,
                            data:{Data:response.data}
                        })
                }
                return resolve(response.data);
            })
            .catch((error)=>{
                if(error){
                    dispatch({
                        type:VIEW_ERROR,
                        data:{error_msg:error.response}
                    })
                }
                return reject(error.response)
            })
        })
    }
}