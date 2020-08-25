import React,{useContext,useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MoreIcon from '@material-ui/icons/MoreVert';

import Drawer from './Drawer/Drawer'
import Container from '@material-ui/core/Container';
import BreadCrumbs from '../Breadcrumbs'
import Paper from '@material-ui/core/Paper';

import Popover from '@material-ui/core/Popover';
import {useSelector,useDispatch} from 'react-redux'

import {AppContext} from '../App'
import CartProduct from './Cart/Cart' 

import * as Cart_action from '../action/Cart/Cart_action'
import * as Auth_action from '../action/Auth/LogIn_action'
import { findByText } from '@testing-library/react';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
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
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    }
}));

const HomePage = props => {
    const { history }=props
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [open,setOpen]=React.useState(false)
    const [searchText,setsearchText]=useState('')
    const [cartAnchorEl, setcartAnchorEl] = React.useState(null);
    const {dispatch} = useContext(AppContext);
    const dispatchaction=useDispatch()
   
    const cartOpen = Boolean(cartAnchorEl);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [loginuser,setloginuser]=useState(Boolean(localStorage.getItem('token')))

    const totalCartproduct=useSelector(state=>state.Cart_Detail.Data)

    useEffect(()=>{
        changeContextvalue(open)
    },[open])

    useEffect(()=>{
        dispatchaction(Cart_action.viewcartproduct()).then(()=>{
                
        }).catch(error=>{})
    },[])

    const changeContextvalue = (newValue) => {
        dispatch({type:'UPDATE_DRAWER_OPEN',opendrawer:newValue})
    }
    const handleDrawerToggle = () => {
        setOpen(!open)
    };
    
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
            <IconButton aria-label="show new notifications" color="inherit" onClick={(e)=>{setcartAnchorEl(e.currentTarget)}}>
                            <Badge badgeContent={totalCartproduct.length!=0?totalCartproduct.length:'0'} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
            </MenuItem>
            {localStorage.getItem('token')===null?<MenuItem>
            <Button variant="outlined" style={{backgroundColor:'#0f7c90',color:'#fff',fontWeight:'600',width:'6rem'}} onClick={()=>props.history.push('/LogIn')}>Log In</Button>
            </MenuItem>:''}
            {localStorage.getItem('token')===null?<MenuItem>
            <Button variant="outlined" style={{backgroundColor:'#0f7c90',color:'#fff',fontWeight:'600',width:'6rem'}} onClick={()=>props.history.push('/SignUp')}>Sign Up</Button>          
            </MenuItem>:''}
            {localStorage.getItem('token')!==null?<MenuItem>
            <Button variant="outlined" style={{backgroundColor:'#0f7c90',color:'#fff',fontWeight:'600',width:'6rem'}} onClick={()=>btnLogOut()}>Log Out</Button>
            </MenuItem>:''}
        </Menu>
    );

    const BreadcrumbContainer = (
        <Container  maxWidth="xl" className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
        })}  style={{ paddingTop:'24px'}}>
            <Typography component="div">
            <Paper elevation={3} style={{ padding:'15px'}}>
                <BreadCrumbs/>
            </Paper>
            </Typography>
        </Container>
    );
    const btnLogOut = () => {
        dispatchaction(Auth_action.Logout_User())
        setloginuser(false)
    }
    const findByText = (e) => {
        setsearchText(e.target.value)
        props.history.push({pathname:'/',state: { searchData: e.target.value }})
    }
    return (
        <div className={classes.grow}>
            <AppBar position="relative"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
             >
                <Toolbar style={{backgroundColor:'#007791'}}>
                    <IconButton
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Course App
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e)=>findByText(e)}
                            value={props.location.state?props.location.state.searchData:''}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show new notifications" color="inherit" onClick={(e)=>{setcartAnchorEl(e.currentTarget)}}>
                            <Badge badgeContent={totalCartproduct.length!=0?totalCartproduct.length:'0'} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        <Popover open={cartOpen} anchorEl={cartAnchorEl} onClose={()=>{setcartAnchorEl(null)}} anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
            vertical:'top',
            horizontal: 'right',
        }}><CartProduct cartClose={(data)=>setcartAnchorEl(data)} cartData={totalCartproduct}/></Popover>
        {localStorage.getItem('token')===null?<Button variant="outlined" style={{backgroundColor:'#fff',margin:'5px',color:'#0f7c90',fontWeight:'600'}} onClick={()=>props.history.push('/LogIn')}>Log In</Button>:''}
        {localStorage.getItem('token')===null?<Button variant="outlined" style={{backgroundColor:'#fff',margin:'5px',color:'#0f7c90',fontWeight:'600'}} onClick={()=>props.history.push('/SignUp')}>Sign Up</Button>:''}          
           {localStorage.getItem('token')!==null?<Button variant="outlined" style={{backgroundColor:'#fff',margin:'5px',color:'#0f7c90',fontWeight:'600'}} onClick={()=>btnLogOut()}>Log Out</Button>:''}             
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            
            <Drawer open={open} history={history}/>
            {renderMobileMenu}
            {renderMenu}
            {BreadcrumbContainer}
        </div>
    );
}
export default withRouter(HomePage)