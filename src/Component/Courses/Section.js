import React,{useEffect,useMemo,useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import LecturePreview from '../Lecture/LecturePreview'

import * as Section_action from '../../action/Section/Section_action'
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
    heading: {
        //fontSize: theme.typography.pxToRem(17),
        fontWeight: 700,
        color: '#505763'
    },
    lecturediv: {
        marginBottom: '5px',
        backgroundColor: '#e8e9eb',
        cursor: 'pointer',
        height: '20px',
        padding: '0px 16px',
        display: 'flex',
        alignItems: 'center',
        flex: 'auto',
        minHeight: '42px',
        fontWeight: 400,
        color: '#007791',
    }
});
const Section = (props)=>{
    const classes = useStyles();
    const {title}=props
    const dispatch = useDispatch()
    const SectionData = useSelector(state => state.Section_Detail.Data)
    const [openAccordion,setopenAccordion]=useState(false)
    const [showPreview,setshowPreview]=useState(false)
    const [selectlecture,setselectlecture]=useState({})

    useEffect(() => {
        if(title!=""){
            dispatch(Section_action.View_SectionDetail(title)).then((data) => {
                
            })
                .catch((error) => { })
        }
    }, [title])

    const handlePreview=(coursetitle,video)=>{
        setshowPreview(true)
        setselectlecture({title:coursetitle,video})
    }

const displaySection = () => {
        return SectionData.map((item,index) => {
            const { sectionTitle, sub } = item
            return (
                <Accordion key={index} style={{ marginBottom: '6px', border: 'solid 1px #e8e9eb' }} onClick={()=>{setopenAccordion(!openAccordion)}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon /> }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{ backgroundColor: '#f9f9f9' }}
                    >
                        <Typography className={classes.heading}>{sectionTitle}</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ display: 'block', padding: '8px 8px 3.5px' }}>
                        {
                                sub.map((lecture,index) => (
                                <div className={classes.lecturediv} key={index} onClick={()=>handlePreview(title,lecture.video)}>
                                    <PlayCircleFilledIcon style={{ padding: '12px 0px', marginRight: '15px', opacity: '0.6' }} />
                                    <Typography style={{ padding: '12px 0px', minWidth: '510px', fontSize: '17px' }}>
                                        {lecture.lectureTitle}
                                    </Typography>
                                    <div style={{ minWidth: '25px', color: '#007791', display: 'flex' }}>
                                        <div style={{ padding: '0px 35px' }}>Preview</div>
                                        <div>{moment.utc(lecture.duration*1000).format("HH:").replace('00:','')+moment.utc(lecture.duration*1000).format("mm:ss")}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </AccordionDetails>
                </Accordion>
            )
        })
    }


    return useMemo(
        ()=><div>
            {displaySection()}
            {showPreview==true?<LecturePreview modalOpen={showPreview} lecData={selectlecture} modalclose={(data)=>{setshowPreview(data)}}/>:''}
            </div>
        ,[SectionData,showPreview]
    )
}

export default Section