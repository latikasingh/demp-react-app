import React,{useState} from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'

import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'

import { Link } from "react-router-dom"


const DrawerMenuItem = props =>{

    const {name,link,Icon,items = []} = props
    const isExpandable=items && items.length > 0
    const [open,setOpen]=useState(false)

    const MenuItemRoot = (
         <ListItem button component={link?Link:''} to={link?link:''} onClick={()=>setOpen(!open)}>
        {!!Icon && 
            (
                <ListItemIcon><Icon/></ListItemIcon>
            )}
            <ListItemText primary={name} inset={!Icon}/>
            {isExpandable && !open && <IconExpandMore/>}
            {isExpandable && open && <IconExpandLess/>}
         </ListItem>
    )

    const MenuItemChildren = (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider/>
            <List component="div">
                {items.map((item,index) => (
                     <DrawerMenuItem {...item} key={index}/>
                ))}
            </List>
        </Collapse>
    )

    return (
        <div>
            {MenuItemRoot}
            {isExpandable?MenuItemChildren:null}
        </div>
    )
}

export default DrawerMenuItem