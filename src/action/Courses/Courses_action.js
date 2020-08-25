import {VIEW_COURSE_SUCCESSFULL,SELECT_COURSE_SUCCESSFULL,VIEW_ERROR} from '../../action/type'

import * as View_CoursesService from '../../service/services'

export const View_CoursesDetail=(maincatnm,subcatnm)=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
            View_CoursesService.Courses_Detail(maincatnm,subcatnm)
            .then((response)=>{
                if(response.status===200)
                {
                    // let MainCategoryList=response.data.map((value)=>{
                    //     return value.MainCategoryname
                    // })
                        dispatch({
                            type:VIEW_COURSE_SUCCESSFULL,
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

export const Select_CourseDetail=(subcatnm,title)=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
            View_CoursesService.Select_Course(subcatnm,title)
            .then((response)=>{
                if(response.status===200)
                {
                    // let MainCategoryList=response.data.map((value)=>{
                    //     return value.MainCategoryname
                    // })
                        dispatch({
                            type:SELECT_COURSE_SUCCESSFULL,
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

export const Find_CoursesDetail=(serchText)=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
            View_CoursesService.Find_Course(serchText)
            .then((response)=>{
                if(response.status===200)
                {
                    // let MainCategoryList=response.data.map((value)=>{
                    //     return value.MainCategoryname
                    // })
                    let cData=[]
                    cData=response.data.map(item=>(
                        item.courseData
                    ))
                    dispatch({
                        type:VIEW_COURSE_SUCCESSFULL,
                        data:{Data:cData}
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