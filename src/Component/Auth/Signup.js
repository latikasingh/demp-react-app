import React,{useRef,useState} from 'react'
import { InputAdornment } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import {useDispatch} from 'react-redux'

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import * as auth_action from '../../action/Auth/Signup_action'

import CourseAppbar from '../HomePage'

const SignUp = props => {
    const form=useRef('form')
    const [formData,setformData]=useState({fullname:'',email:'',password:''})
    const dispatch=useDispatch()
   
    const handleChange = (e) => {
        setformData(prevState=>{return {...prevState,[e.target.name]:e.target.value}})
    }
 
    const handleSubmit = () => {
        dispatch(auth_action.Signup_user(formData)).then((data)=>{
            props.modalOpen?props.SetModal('LogIn'):props.history.push('/LogIn')
        }).catch(error=>{})
    }
    return(
        <div>
            {!props.modalOpen?<><CourseAppbar/><div style={{paddingTop:'1rem'}}></div></>:''}
            <div style={{display:'inline-flex'}}>
            <div style={{backgroundColor:'#fff',outline:'0',width:'30rem'}}>
              <div style={{borderBottom:'solid 1px #dedfe0',fontWeight:'700',padding:'24px 24px 24px 24px',fontSize:'18px'}}>
                Start Up and Start Learning!
                {props.modalOpen?<CloseIcon style={{float:'right',fontSize:'2rem',color:'#686f7a'}} onClick={()=>props.handlemodalClose(false)}/>:''}
              </div>
              <div style={{padding:'16px 24px 16px',borderBottom:'solid 1px #dedfe0'}}>
              <ValidatorForm
                useRef="form"
                onSubmit={handleSubmit}
                onError={errors => console.log(errors)}
            >
                <TextValidator
                    label="Full Name"
                    onChange={handleChange}
                    name="fullname"
                    value={formData.fullname}
                    validators={['required']}
                    errorMessages={['full name is required']}
                    style={{display:'flex'}}
                    variant="outlined"
                    margin="normal"
                    InputProps={{startAdornment:<InputAdornment position="start"><PersonIcon style={{color:'#cacbcc'}}/></InputAdornment>}}
                />
                <TextValidator
                    label="Email"
                    onChange={handleChange}
                    name="email"
                    value={formData.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['email is required', 'email is not valid']}
                    style={{display:'flex'}}
                    variant="outlined"
                    margin="normal"
                    InputProps={{startAdornment:<InputAdornment position="start"><EmailIcon style={{color:'#cacbcc'}}/></InputAdornment>}}
                />
                <TextValidator
                    label="Password"
                    onChange={handleChange}
                    name="password"
                    type="password"
                    value={formData.password}
                    validators={['required']}
                    errorMessages={['Password is required']}
                    style={{display:'flex'}}
                    variant="outlined"
                    margin="normal"
                    InputProps={{startAdornment:<InputAdornment position="start"><LockIcon style={{color:'#cacbcc'}}/></InputAdornment>}}
                />
                <div style={{fontSize:'15px',paddingTop:'1rem'}}>I'm in for emails with exiciting discounts and personalized recommendations</div>
                <Button type="submit" variant="contained" style={{marginTop:'1.2rem',color:'#fff',fontWeight:'700',backgroundColor:'#ec5252',width:'100%',padding:'10px 10px',fontSize:'18px'}}>Sign Up</Button>
            </ValidatorForm>
              </div>
              <div style={{padding:'15px 0 24px',textAlign:'center',fontSize:'18px'}}>Already have an account? 
              <a style={{color:'#007791',fontWeight:'700',cursor:'pointer'}} onClick={()=>{props.modalOpen?props.SetModal('LogIn'):props.history.push('/LogIn')}}>Log In</a>
              </div>
          </div>
            </div>
        </div>
    )
}
export default SignUp