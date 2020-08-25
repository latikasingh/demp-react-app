import React, { useState,useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import {useDispatch,useSelector} from 'react-redux'
import * as Courses_action from '../../action/Courses/Courses_action'
import CourseList_Models from './CourseList_Model'

import {baseURL} from '../../service/baseService'
const BASEurl=baseURL+"Upload/"

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
        float:"left",
        minHeight:335,
        minWidth:300,
        margin:'20px',
        "&:hover":{
            boxShadow: '3px 3px 3px 3px #C0C0C0'
        }
    },
    media: {
        height: 180,
    },
    courseBody: {
        textAlign: 'left'
    },
    courseTitle: {
        fontSize: '1.125rem',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        fontWeight: 550,
        minHeight:45
    },
    instructorData: {
        margin: '10px 0px 10px 0px'
    },
    coursePrice: {
        textAlign: 'right'
    },
}));

const CoursesListDetail = props => {
    const { children, value, index, maincatnm, subcatnm,history, ...other } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [cartindex,setCartindex]=useState(0)
    const CoursesDetail=useSelector(state=>state.Courses_Detail.Data)

    const dispatch=useDispatch()

    useEffect(()=>{
        if(subcatnm!=''){
            dispatch(Courses_action.View_CoursesDetail(maincatnm,subcatnm)).then((data)=>{
              })
              .catch((error)=>{})
        }
    },[subcatnm])

    const openCartModel = (e,index) => {
        setAnchorEl(anchorEl ? null : e.currentTarget);
        if(index!="")setCartindex(index)
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const cardList= ()=>{
        return CoursesDetail.map((item,index)=>{
            const {title,instructorName,price,image}=item
            return (
                <Card key={index} className={classes.root} onMouseOver={(e)=>openCartModel(e,index)} id={index} onClick={()=>{history.push({pathname:'/Courses/'+maincatnm+'/'+subcatnm,state: { Data: title }})}}>
                        <CardActionArea >
                            <CardMedia
                                className={classes.media}
                               image={BASEurl+image}
                                title={title}
                            />
                            <CardContent className={classes.courseBody}>
                                <Typography gutterBottom variant="h4" component="h4" className={classes.courseTitle}>
                                    {title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" className={classes.instructorData}>
                                    {instructorName}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h5" className={classes.coursePrice}>
                                    ${price}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
            )
        })
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                    {cardList()}
                    {open && <CourseList_Models id={id} open={open} anchorEl={anchorEl} maincatnm={maincatnm} subcatnm={subcatnm} CoursesList={CoursesDetail[cartindex]} onMouseOver={(e)=>openCartModel(e,index)}/>}
                </Box>
            )}
        </div>
    );
}

export default CoursesListDetail