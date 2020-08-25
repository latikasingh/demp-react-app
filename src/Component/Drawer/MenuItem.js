import React,{useEffect ,useState} from "react";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import {useDispatch} from 'react-redux'
import * as MainCatory_action from '../../action/Category/Main_Category_action'

const MenuItem = ()=>{
    const dispatch=useDispatch()
    const [ChildItem,setChildItem]=useState([])


    useEffect(()=>{
    dispatch(MainCatory_action.View_AllMainCategory()).then((data)=>{
        let subchildren=[]
        data.map((item)=>{
            subchildren.push({"name":item.MainCategoryname,"link":"/Courses/"+item.MainCategoryname})
        })
        setChildItem(subchildren)
    })
    .catch((error)=>{})
  },[])

  return [
    {
        name:'Courses',
        link:'/',
        Icon:InboxIcon
    },
    {
        name:'All Courses',
        Icon:MailIcon,
        items:ChildItem
    }
  ]
}

export default MenuItem