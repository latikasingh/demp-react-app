import React,{useContext,useEffect,useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import CourseAppBar from '../HomePage'
import {AppContext} from '../../App'

import {useDispatch,useSelector} from 'react-redux'
import * as SubCatory_action from '../../action/Category/Sub_Category_actions'

import CourseList from './CoursesListDetail'

const drawerWidth = 240;

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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

const SimpleTabs = props => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [subcat,setSubcat]= useState('')

  const {state} = useContext(AppContext);

  const MainCategoryName=props.match.params.category
  const dispatch=useDispatch()
  const SubCategoryList=useSelector(state=>state.SubCategory.Data)

  useEffect(()=>{
    dispatch(SubCatory_action.View_AllSubCategory(MainCategoryName)).then((data)=>{
        setSubcat(data[0].SubCategoryname)
    })
    .catch((error)=>{})
  },[MainCategoryName])

  const handleChange = (event, newValue) => {
    setSubcat(SubCategoryList[newValue])
    setValue(newValue);
  };
  const renderMaincategorylist = () => {
    return SubCategoryList.map((item,index)=>{
      return (
        <Tab label={item} key={index} {...a11yProps(index)} />
      )
    })
  }

  // const Display_CourseDetail = () =>{
  //   return(
      
  //   )
  //  // return(
  //    // subcat!=='' && 
  //     // return SubCategoryList.map((item)=>{
  //     //   return(
  //     //     <CourseList value={value} index={value} maincatnm={MainCategoryName} subcatnm={subcat}>
  //     //     Item One
  //     //     </CourseList>
  //     //   )
  //     // })
  //     //)
  //     // return SubCategoryList.map((item,index)=>{
  //     //   return(
  //     //     <CourseList value={value} index={index} maincatnm={MainCategoryName} subcatnm={subcat}>
  //     //       Items
  //     //     </CourseList>
  //     //   )
  //     // })
  // }
  return (
    <div>
     <CourseAppBar></CourseAppBar>
      <div className={classes.root} className={clsx(classes.appBar, {
                    [classes.appBarShift]: state.open,
                })} style={{padding:'20px'}}>
      <Paper className={classes.root} elevation={1}>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" aria-label="simple tabs example">
        {renderMaincategorylist()}
        </Tabs>
      </Paper>
      <CourseList value={value} index={value} maincatnm={MainCategoryName} subcatnm={subcat} history={props.history}/>
      
    </div>
    
    </div>
    
  );
}

export default SimpleTabs