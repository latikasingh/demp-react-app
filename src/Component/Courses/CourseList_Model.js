import React,{useState,useEffect} from 'react'
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch,useSelector} from 'react-redux'
import { withRouter } from 'react-router-dom';

import { Courses_Detail } from '../../service/services'
import moment from 'moment'

import * as Cart_Action from '../../action/Cart/Cart_action'

const useStyles = makeStyles((theme) => ({
    courseTitle: {
        fontSize: '1.125rem',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        fontWeight: 550,
        minHeight:47
    },
    paper: {
        maxWidth: 330,
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
    },
    coursecategory: {
        fontSize: '0.8rem',
        display: 'flex',
        margin: '0px 0px 8px 0px'
    },
    Descrip_Course: {
       // color: '#696969',
        marginTop:'10px'
    },
    listdata:{
        marginTop:'10px',
        minHeight:150
    },
    listitem:{
      //  color: '#696969',
        fontSize: '0.85rem',
    }
}));

const CourseList_Modal = props =>{
    const {id,open,anchorEl,CoursesList,maincatnm,subcatnm}=props
    const {title,headline,description,updatedAt}=CoursesList
    const [addcart,setaddcart]=useState(false)
    const selectedcartproduct=useSelector(state=>state.Cart_Detail.Data)
    
    const dispatch=useDispatch()

    const classes = useStyles();
    useEffect(()=>{
        dispatch(Cart_Action.viewcartproduct()).then(()=>{
                
        }).catch(error=>{})
    },[CoursesList])

    useEffect(()=>{
        if(addcart){
            dispatch(Cart_Action.addproducttocart(CoursesList)).then(()=>{
                
            }).catch(error=>{})
        }
    },[addcart])

    return(
        <Popper id={id} open={open} anchorEl={anchorEl} placement="right">
            <Paper className={classes.paper} elevation={3}>
                <Typography gutterBottom  className={classes.coursecategory}>
                    Last Updated: {moment(updatedAt).format('MM/YYYY')}
                </Typography>
                <Typography gutterBottom variant="h4" component="h4" className={classes.courseTitle}>
                    {title}
                </Typography>
                <Typography gutterBottom  className={classes.coursecategory}>
                    In {subcatnm} | {maincatnm}
                </Typography>
                <Typography gutterBottom className={classes.coursecategory}>
                    <PlayCircleFilledIcon style={{ marginTop: '-3px' }} />491 lectures
                </Typography>
                <Typography gutterBottom className={classes.Descrip_Course}>
                    {headline}
                </Typography>
                <Typography gutterBottom component="ul" className={classes.listdata}>
                    {
                        description.map((lists,index)=>index<3 && (
                            <Typography gutterBottom component="li" key={index} className={classes.listitem}>
                                {lists}
                            </Typography>
                        ))
                    }
                </Typography>
                <Typography gutterBottom component="p" style={{display:'inline-flex'}}>
                    {
                        selectedcartproduct.filter((item)=>item.title===title).length==0?(<Button variant="contained" style={{backgroundColor:'#ec5252',color:'white',marginTop:'15px',width:250,height:48}} onClick={()=>setaddcart(true)}>
                        Add to cart
                    </Button>):(<Button variant="contained" style={{backgroundColor:'#ec5252',color:'white',marginTop:'15px',width:250,height:48}} onClick={()=>props.history.push("/ShoppingCart")}>
                        Go to Cart
                    </Button>)
                    }
                    <FavoriteBorderIcon style={{color:'#ff3739',marginTop:'15px',height:48,fontSize:35,marginLeft:'20px'}}/>
                </Typography>
            </Paper>
        </Popper>
    )
}

export default withRouter(CourseList_Modal)