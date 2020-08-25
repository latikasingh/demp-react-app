import baseService from './baseService'

export function View_MainCategory(){
    return baseService.get('/listmaincategory')
}

export function View_SubCategory(maincatnm){
    return baseService.get('/listsubcategory/'+maincatnm)
}

export function Courses_Detail(maincatnm,subcatnm){
    return baseService.get('/listcourses?maincatnm='+maincatnm+'&subcatnm='+subcatnm)
}

export function Select_Course(subcatnm,title){
    return baseService.get('/Coursedetail/'+subcatnm+"/"+title)
}

export function Find_Course(text){
    return baseService.get('/find?search='+text)
}

export function Section_Detail(title){
    return baseService.get('/sectionlecturewise/'+title)
}

export function getCategoryData(subcatid){
    return baseService.get('/CategorybyCourse/'+subcatid)
}

export function signup(userdata){
    return baseService.post('/SignUp',userdata)
}

export function LogIn(credentail){
    return baseService.post('/login',credentail)
}

export function Checkout(data){
    return baseService.post('/createcheckout',data)
}