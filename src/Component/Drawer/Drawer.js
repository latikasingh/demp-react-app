import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import DrawerMenus from './DrawerMenu'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent:'center'
    },
}));

const DrawerMenu = props =>{
    const { open }=props
    const classes = useStyles();

    return(
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper
            }}
         >
            <div className={classes.drawerHeader}>
                <Typography variant="h6" noWrap>
                    Courses
                </Typography>
            </div>
            <Divider />
            
            <DrawerMenus/>

        </Drawer>
    )
}

export default DrawerMenu