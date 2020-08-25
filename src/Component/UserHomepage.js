import React,{useContext,useEffect,useState} from 'react'
import Carousel from "nuka-carousel";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import CourseAppBar from './HomePage'
import {AppContext} from '../App'
import {useDispatch,useSelector} from 'react-redux'

import * as Course_action from '../action/Courses/Courses_action'
import {baseURL} from '../service/baseService'
const BASEurl=baseURL+"Upload/"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop:'10px',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
      }),
  },
  appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
      }),
  },
  }));

const UserHomepage = (props) => {
    const classes = useStyles();
    const {state} = useContext(AppContext);
    const [CoursesDetail,setCoursesDetail]=useState([])
    const bannrs = ["banner3.jpg", "banner2.jpg", "banner4.jpg"]
    const dispatch=useDispatch()
  //  const CoursesDetail=useSelector(state=>state.Courses_Detail.Data)

    useEffect(()=>{
        const searchText=props.location.state?props.location.state.searchData:''
       //  if(props.location.state){
            dispatch(Course_action.Find_CoursesDetail(searchText)).then((data)=>{
                setCoursesDetail(data)
            })
            .catch((error)=>{})
        // }
    },[props.location.state])
    const displayCourses = () => {
        return CoursesDetail.map((item,index)=>{
            const {title,headline,instructorName,price,image}=item.courseData
            const maincatnm = item.maincatnm
            const subcatnm = item.subcatnm
            return (
                <div style={{padding:'.4rem',borderBottom:'1px solid #dcdacb'}} key={index}>
                    <a style={{textDecoration:'none'}} onClick={()=>{props.history.push({pathname:'/Courses/'+maincatnm+'/'+subcatnm,state: { Data: title }})}}>
                        <div style={{display:'flex'}}>
                            <div style={{marginRight:'1.6rem'}}>
                                <img src={BASEurl+image}/>
                            </div>
                            <div style={{maxWidth:'40rem',minWidth:'40rem',paddingTop:'.3rem',marginRight:'2rem'}}>
                                <div style={{marginBottom:'.4rem',fontWeight:'700',fontSize:'1.2rem'}}>{title}</div>
                                <div style={{marginBottom:'.4rem',fontSize:'1rem',lineHeight:'1rem'}}>{headline}</div>
                                <div style={{marginBottom:'.4rem',color:'#73726c',fontSize:'.9rem'}}>Academind by {instructorName}</div>
                            </div>
                            <div style={{paddingTop:'.3rem',fontWeight:'700',fontSize:'1.3rem'}}>${price}</div>
                        </div>
                    </a>
                </div>
            )
        })
    }
    return (
        <div>
            <CourseAppBar />
            <div style={{ height: '400px', paddingTop: '1rem' }} className={classes.root} className={clsx(classes.appBar, {
                    [classes.appBarShift]: state.open,
                })}>
                <Carousel
                    withoutControls={false}
                    transitionMode={"scroll"}
                    horizontal
                    cellAlign={"left"}
                    slidesToShow={1}
                    slidesToScroll={"auto"}
                    wrapAround={false}
                    autoplay={true}
                    slideIndex={0}
                    height={'100%'}
                >
                    {bannrs.map((item, index) => (
                        <div key={index}><img src={require("../assets/" + item)}
                            style={{ height: '100%', width: '100%' }} /></div>
                    ))}
                </Carousel>
            </div>
            <div style={{textAlign:'left',padding:'0rem 3rem',color:'#3c3b37'}}>
                {props.location.state?<h2>{CoursesDetail.length} results for "redux"</h2>:<h2>Learning Courses</h2>}
                    {displayCourses()}
            </div>
        </div>
    )
}

export default UserHomepage