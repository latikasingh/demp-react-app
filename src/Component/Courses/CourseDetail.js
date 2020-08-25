import React, { useContext, useEffect,useState, useMemo,useCallback,useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CourseAppBar from '../HomePage'
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { AppContext } from '../../App'
import Section from './Section'
import * as Courses_action from '../../action/Courses/Courses_action'
import * as Section_action from '../../action/Section/Section_action'
import * as Cart_action from '../../action/Cart/Cart_action'

import { baseURL } from '../../service/baseService'
const BASEurl = baseURL + "Upload/"


const drawerWidth = 240;

//const useStyles = makeStyles((theme) => ({
    const useStyles = makeStyles({
    // appBar: {
    //     transition: theme.transitions.create(['margin', 'width'], {
    //         easing: theme.transitions.easing.sharp,
    //         duration: theme.transitions.duration.leavingScreen,
    //     }),
    // },
    // appBarShift: {
    //     width: `calc(100% - ${drawerWidth}px)`,
    //     marginLeft: drawerWidth,
    //     transition: theme.transitions.create(['margin', 'width'], {
    //         easing: theme.transitions.easing.easeOut,
    //         duration: theme.transitions.duration.enteringScreen,
    //     }),
    // },
    main_coursedetail: {
        backgroundColor: '#29303B',
        color: 'white',
        alignContent: 'center',
        marginTop: '15px'
    },
    container_course: {
        maxWidth: 1200,
        padding: '0px 15px 0px 15px',
        marginRight: 'auto',
        marginLeft: 'auto',
        display: 'flex'
    },
    subcontainer: {
        maxWidth: '750px',
        marginLeft: '15px',
        textAlign: 'left',
        padding: '10px 0px 25px 0px'
    },
    divHeadline: {
        fontSize: '20px',
        lineHeight: '27px',
        marginTop: -12,
        marginBottom: 0
    },
    divdes: {
        display: 'flex',
        marginTop: '10px'
    },
    div_mainpoint: {
        fontSize: '22px',
        fontWeight: 700,
        margin: '0 0 10px'
    },
    papperdetail: {
        marginTop: '40px',
        textAlign: 'left',
        padding: '10px 15px',
        maxWidth: '760px',
        backgroundColor: '#f9f9f9',
    },
    lecturedetail: {
        marginTop: '40px',
        textAlign: 'left',
        minWidth: '785px',
        border: '0px',
    },
    pointlist: {
        display: 'inline-flex',
        maxWidth: '380px',
        paddingBottom: '14px',
        fontSize: '15px'
    },
    root: {
        maxWidth: 340,
        minWidth: 340,
        margin: '4px',
        marginTop: '40px',
        marginLeft: '810px',
        position: 'absolute',
        "&:hover": {
            //  boxShadow: '3px 3px 3px 3px #C0C0C0'
        }
    },
    media: {
        height: 180,
        margin: '4px'
    },
    cartBody: {
        padding: '15px 30px'
    },
    cartprice: {
        color: '#505763',
        fontSize: '36px',
        fontWeight: 700,
        textAlign: 'left'
    },
});

const CourseDetail = props => {
    const classes = useStyles();
    const { state } = useContext(AppContext);
    const dispatch = useDispatch()
    const CourseData = useSelector(state => state.Select_Course.Data)
    const [title,setTitle]=useState('')
    const SectionData = useSelector(state => state.Section_Detail.Data)
    const selectedcartproduct=useSelector(state=>state.Cart_Detail.Data)
    const [openAccordion,setopenAccordion]=useState(false)
    const [addcart,setaddcart]=useState(false)

    useEffect(() => {
        if (props.location.state.Data != undefined) {
            const Title = props.location.state.Data
            dispatch(Courses_action.Select_CourseDetail(props.match.params.subcatnm, Title)).then((data) => {
                setTitle(data.title)
                dispatch(Section_action.View_SectionDetail(data.title))
            }).catch((error) => { })

            dispatch(Cart_action.viewcartproduct()).then(()=>{
                            
            }).catch(error=>{})
        }
        // else
        // props.history.push({pathname:"/Courses/"+props.match.params.maincatnm})
    }, [props.location.state.Data])

    useEffect(()=>{
        if(addcart){
            dispatch(Cart_action.addproducttocart(CourseData)).then(()=>{
                dispatch(Cart_action.viewcartproduct()).then(()=>{
                            
                }).catch(error=>{})
            }).catch(error=>{})
        }
    },[addcart])

    const displayDescription = () => {
        if (CourseData.description !== undefined) {
            return CourseData.description.map((item,index) => {
                return (
                    <div key={index} className={classes.pointlist}><CheckIcon style={{ marginRight: '8px', color: '#8a92a3' }} /><div style={{ paddingRight: '50px' }}>{item}</div></div>
                )
           })
        }
    }

    // const openPreview = () => {
    //     setModalOpen(true)       
    // }

    
    return useMemo(
        ()=><div>
           <CourseAppBar></CourseAppBar>
              <div className={clsx(classes.appBar, {
                [classes.appBarShift]: state.open,
            })}>
                <div className={classes.main_coursedetail}>
                    <div className={classes.container_course}>
                        <div className={classes.subcontainer}>
                            <h1>{CourseData.title}</h1>
                            <p className={classes.divHeadline}>{CourseData.headline}</p>
                            <div className={classes.divdes}><div style={{ marginRight: '15px' }}><b>Created By</b> {CourseData.instructorName}</div><div><b>Last Updated</b> {moment(CourseData.updatedAt).format('MM/YYYY')}</div></div>
                        </div>
                        <Card className={classes.root}>
                            <CardMedia
                                className={classes.media}
                                image={BASEurl + CourseData.image}
                                title=""
                            />
                            <CardContent className={classes.cartBody}>
                                <Typography component="div" className={classes.cartprice}>
                                    ${CourseData.price}
                                </Typography>
                                {
                                    selectedcartproduct.filter((item)=>item.title===CourseData.title).length==0?(
                                        <Button variant="contained" style={{ backgroundColor: '#ec5252', color: 'white', marginTop: '5px', width: 275, height: 48, fontWeight: 700 }} onClick={()=>setaddcart(true)}>
                                             Add to cart
                                        </Button>):(
                                        <Button variant="contained" style={{ backgroundColor: '#ec5252', color: 'white', marginTop: '5px', width: 275, height: 48, fontWeight: 700 }} onClick={()=>props.history.push("/ShoppingCart")}>
                                            Go to Cart
                                        </Button>)
                                }
                                <Button variant="outlined" onClick={()=>{localStorage.getItem('token')===null?props.history.push("/Login"):props.history.push("/ShoppingCart")}} style={{ color: '#007791', border: '1px solid #007791', marginTop: '10px', width: 275, height: 48, fontWeight: 700 }}>
                                    Buy Now
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className={classes.main_coursedetail} style={{ backgroundColor: 'white' }}>
                    <div className={classes.container_course}>
                        <Paper variant="outlined" square className={classes.papperdetail}>
                            <div className={classes.div_mainpoint}>What you'll learn</div>
                            <div>
                                {CourseData.description !== undefined && displayDescription()}
                            </div>
                        </Paper>
                    </div>
                </div>
                <div className={classes.main_coursedetail} style={{ backgroundColor: 'white' }}>
                    <div className={classes.container_course}>
                        <Paper variant="outlined" square className={classes.lecturedetail}>
                            <div className={classes.div_mainpoint}>Course content</div>
                            <div>
                            <Section title={title}/>
                            </div>
                        </Paper>
                    </div>
                </div>
            </div>
            <div>
             
            </div>
           
        </div>,[title,selectedcartproduct]
    )
}

export default CourseDetail