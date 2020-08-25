import React,{useEffect,useState} from 'react'
import Button from '@material-ui/core/Button';
import {useDispatch,useSelector} from 'react-redux'
import { withRouter, Router } from 'react-router-dom';

import { Modal} from '@material-ui/core';

import CourseAppbar from '../HomePage'

import * as CartAction from '../../action/Cart/Cart_action'
import * as CategoryAction from '../../action/Category/Sub_Category_actions'

import SignUp from '../Auth/Signup'
import LogIn from '../Auth/Login'

import {baseURL} from '../../service/baseService'
import Checkout from '../Checkout/checkout'

const BASEurl=baseURL+"Upload/"

const CheckoutCart = props => {
    const dispatch=useDispatch()
    const CartAllData=useSelector(state=>state.Cart_Detail.Data)

    const [ModalOpen,setModalOpen]=useState(false)
    const [currentModal,setcurrentModal]=useState('SignUp')
    const [checkoutmodal,setcheckoutmodal]=useState(false)

    useEffect(()=>{
        dispatch(CartAction.viewcartproduct()).then(()=>{}).catch((error)=>{})
    },[])
    

    const getCourseDetail=(subcatid,carttitle)=>{
        dispatch(CategoryAction.getCategoryName(subcatid)).then((data)=>{
            props.history.push({pathname:'/Courses/'+data.maincatnm+'/'+data.subcatnm,state: { Data: carttitle }})
        }).catch((error)=>{})
    }

    const Displaycartproduct = () =>{
        return CartAllData.map((item,index)=>(
<           div style={{display:'flex',height:'7.8rem'}} key={index}>
                <div style={{border:'solid 1px #dedfe0',padding:'10px',display:'flex'}}>
                    <div style={{display:'flex',cursor:'pointer'}} onClick={()=>{getCourseDetail(item.SubCategoryId,item.title)}}>
                        <img src={BASEurl+item.image} style={{marginRight:'.9rem',width:'12rem',height:'6.2rem'}}/>
                        <div style={{maxWidth:'30rem',minWidth:'30rem'}}>
                            <div style={{fontWeight:'700',fontSize:'19px'}}>{item.title}</div>
                            <span style={{color:'#686f7a'}}>By {item.instructorName}</span>
                        </div>
                    </div>
                    <div style={{color:'#0f7c90',fontSize:'18px',fontWeight:'700',padding:'0 1rem',cursor:'pointer'}} onClick={()=>removeProduct(item)}>Remove</div>
                    <div style={{color:'#ec5252',fontWeight:'700',fontSize:'22px',padding:'0 1rem'}}>${item.price}</div>
                </div>
            </div>
        ))
    }
    const removeProduct = (removeProduct)=>{
        dispatch(CartAction.removecartproduct(removeProduct)).then(()=>{}).catch((error)=>{})
    }
    const totPrice = () => {
        let TotalPrice=0
        CartAllData.map((item)=>{
            TotalPrice += item.price
        })
        return TotalPrice
    }
    const ModalClose = (data) => {
        if(!data){
            setcurrentModal('SignUp')
            setModalOpen(data)
        }
    }
    return(
        <div>
            <CourseAppbar/>
            <div style={{width:'1250px',textAlign:'left',paddingTop:'3rem',display:'inline-flex'}}>
                <div>
                    <div style={{fontSize:'19px',fontWeight:'400',padding:'.5rem 0rem'}}>{CartAllData.length} Courses in Cart</div>
                    {Displaycartproduct()}
                </div>
                <div style={{marginLeft:'2rem',width:'380px'}}>
                    <div style={{padding:'30px 0'}}>
                        <div style={{color:'#686f7a',fontSize:'22px'}}>Total:</div>
                        <div style={{fontWeight:'700',fontSize:'36px'}}>${totPrice()}</div>
                    </div>
                    <div>
                    {checkoutmodal?<Checkout/>:
                        <Button variant="contained" style={{color:'#fff',backgroundColor:'#ec5252',width:'100%',padding:'12px 20px',fontSize:'18px',fontWeight:'700'}} onClick={()=>{localStorage.getItem('token')===null?setModalOpen(true):setcheckoutmodal(true)}}>
                            Checkout
                        </Button>
                    }
                    </div>
                </div>
            </div>
            <Modal
        open={ModalOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        onClose={()=>{ModalClose(false)}}
      >
          <div style={{backgroundColor:'#fff',outline:'0',width:'30rem'}}>
              {currentModal==='SignUp'?<SignUp modalOpen={ModalOpen} handlemodalClose={(data)=>ModalClose(data)} SetModal={(data)=>setcurrentModal(data)}/>:''}
              {currentModal==='LogIn'?<LogIn modalOpen={ModalOpen} handlemodalClose={(data)=>ModalClose(data)} SetModal={(data)=>setcurrentModal(data)}/>:''}
          </div>
      </Modal>
        </div>
    )
}
export default withRouter(CheckoutCart)