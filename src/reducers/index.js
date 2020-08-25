import {combineReducers} from 'redux'

import MainCategory from './defaultreducers/Main_Category_reducer'
import SubCategory from './defaultreducers/Sub_Category_reducer'
import Courses_Detail from './defaultreducers/Courses_reducer'
import Select_Course from './defaultreducers/Select_Course_reducer'
import Section_Detail from './defaultreducers/Section_reducer'
import Cart_Detail from './defaultreducers/Cart_reducer'
import Signup from './defaultreducers/signup_reducer'
import Userdata from './defaultreducers/LogIn_reducer'
import Checkout from './defaultreducers/Checkout_reducer'

export default combineReducers({MainCategory,SubCategory,Courses_Detail,Select_Course,Section_Detail,Cart_Detail,Signup,Userdata,Checkout})