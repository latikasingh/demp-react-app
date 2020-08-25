import React,{useState,useMemo} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Player,BigPlayButton  } from 'video-react';
import { Modal } from '@material-ui/core';
import { baseURL } from '../../service/baseService'
const BASEurl = baseURL + "Lectures/"

const useStyles = makeStyles({
    coursemodal:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
      //  overflow:'',
       // maxWidth:'100rem'
    },
    modaldiv:{
        padding:'0rem 2rem 0rem 2rem',
        color:'#fff',
        backgroundColor:'#1e1e1c',
       // overflow:'hidden'
       width:'40rem'
    },
    preview_title:{
       padding:'0 2rem 1.5rem 0'
    },
    preview_intro:{
        display:'block',
        margin:'0 0 .5rem',
        color:'#dcdacb',
        fontWeight:'700',
        paddingTop:'1rem'
    },
    preview_text:{
        fontSize:'1.3rem',
        fontWeight:'700'
    },
    videoplayer:{
        paddingBottom:'2rem',
        display:'flex'
    }
});

const LecturePreview = props=>{
    const classes = useStyles();
    const [Modalopen,setModalOpen]=useState(props.modalOpen)
    const handleClose=()=>{
        setModalOpen(false)
        props.modalclose(false)
    }

    return useMemo(
        ()=><Modal
        open={Modalopen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.coursemodal}
      >
         <div className={classes.modaldiv} onClose={()=>setModalOpen(false)}>
                  <div style={{display:'flex'}}>
                    <div className={classes.preview_title}>
                        <span className={classes.preview_intro}>Course Preview</span>
                        <span className={classes.preview_text}>{props.lecData.title}</span>
                    </div>
                    <CloseIcon style={{fontSize:'1.7rem',paddingTop:'1rem',cursor:'pointer'}} onClick={handleClose}/>
                  </div>
               <div className={classes.videoplayer}>
                 <Player src={BASEurl+props.lecData.video} display="flex">
                    <BigPlayButton position="center" />
                 </Player>
               </div>
             </div>
      </Modal>,[Modalopen]
    )
}

export default LecturePreview