import React from 'react'
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import {baseURL} from '../../service/baseService'
const BASEurl=baseURL+"Upload/"

const useStyles = makeStyles((theme) => ({
    cartcontainer:{
        padding:'0rem 1.2rem',
        textAlign:'center',
        border:'1px solid #dcdacb',
        minWidth:'20rem'
    },
    emptycontainer:{
        padding:'2rem',
        textAlign:'center',
        border:'1px solid #dcdacb',
        minWidth:'15rem'
    },
    emptyfirst:{
        color:'#73726c',
        fontSize:'1.2rem',
        marginBottom:'1rem'
    },
    emptysecond:{
        color:'#007791',
        cursor:'pointer',
        fontWeight:'700',
        textDecoration:'none'
    },
    productcontainer:{
        display:'flex',
        cursor:'pointer',
        textAlign:'left',
        padding:'1rem 0rem',
        borderBottom:'1px solid #dcdacb'
    },
    cartimage:{
        width:'6rem',
        height:'6rem',
        position:'relative'
    },
    cartdetailmain:{
        padding:'0 .5rem',
        width:'14rem'
    },
    titlecontainer:{
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
        overflow:'hidden',
        fontWeight:'700',
        lineHeight:'1.2rem',
        fontSize:'1.1rem',
        marginBottom:'.3rem'
    },
    authorblock:{
        color:'#73726c',
        overflow:'hidden',
        textOverflow:'ellipsis',
        whiteSpace:'nowrap',
        fontSize:'.9rem',
        marginBottom:'.1rem'
    },
    totalcontainer:{
        textAlign:'left',
        fontWeight:'700',
        fontSize:'1.3rem',
        paddingTop:'1rem'
    },
    gobutton:{
        backgroundColor:'#0f7c90',
        color:'white',
        width:'100%',
        height:'2.8rem',
        fontWeight:'700',
        marginTop:'.8rem',
        marginBottom:'1rem',
        '&:hover': {
            backgroundColor:'#0f7c90',
        },
    }
}))

const Cart = props => {
    const classes = useStyles();

    const totPrice = () => {
        let TotalPrice=0
        props.cartData.map((item)=>{
            TotalPrice += item.price
        })
        return TotalPrice
    }

    const displaycartProduct =() => {
        return props.cartData.map((item,index)=>(
            <a className={classes.productcontainer} key={index}>
                <div className={classes.cartimage}><img src={BASEurl+item.image} width="100" height="100" style={{borderRadius:'4px'}}/></div>
                <div className={classes.cartdetailmain}>
                    <div className={classes.titlecontainer}>{item.title}</div>
                    <div className={classes.authorblock}>Academind by {item.instructorName}</div>
                    <div style={{fontWeight:700}}>${item.price}</div>
                </div>
            </a>
        ))
    }

    return (
        <div>
           {props.cartData.length==0?(
               <div className={classes.emptycontainer}>
                   <div className={classes.emptyfirst}>Your cart is empty.</div>
                    <a href="#" className={classes.emptysecond} onClick={()=>{props.history.location.pathname!=="/"?props.history.replace('/'):props.cartClose(null)}}>Keep Shopping</a>
                </div>
           ):<div className={classes.cartcontainer}>
               <div>
                   {displaycartProduct()}
                   <div className={classes.totalcontainer}>
                       Total: ${totPrice()}
                   </div>
                   <Button variant="contained" className={classes.gobutton} onClick={()=>{props.history.push("/ShoppingCart")}}>
                        Go to Cart
                    </Button>
                </div>
                </div>
           }
           </div>
    )
}

export default withRouter(Cart)