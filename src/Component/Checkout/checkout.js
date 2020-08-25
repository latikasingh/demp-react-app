import React, { useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {useSelector,useDispatch} from 'react-redux'
import { withRouter } from 'react-router-dom';

import * as CartAction from '../../action/Cart/Cart_action'
import * as CheckoutAction from '../../action/Checkout/Checkout_actions'

const stripeApiKey = "pk_test_51HCiaLGCMaz48amsdVMVxzAfuI5WhMu6bgWk8TpQTAY0sA0MyQWajrVlDfoyYiGHNxxSIWe7ivqzcSRAi17pNAXN00I6UPyw46";

const Checkout = props => {
    const dispatch=useDispatch()
    const CartAllData=useSelector(state=>state.Cart_Detail.Data)

    const amount=100

    useEffect(()=>{
        dispatch(CartAction.viewcartproduct()).then(()=>{}).catch((error)=>{})
    },[])

    const onToken = (token, addresses) => {
        let TotalAmount=0
        let CourseData=CartAllData.map((item)=>{
            TotalAmount+=item.price
            return {"id":item._id,"price":item.price}
        })
        let CheckoutData={
            "name":addresses.billing_name,
            "email":token.email,
            "token_id":token.id,
            "payment_type":token.type,
            "card_brand":token.card.brand,
            "country":addresses.billing_address_country,
            "address":addresses.billing_address_line1,
            "state":addresses.billing_address_state,
            "city":addresses.billing_address_city,
            "zip":addresses.billing_address_zip,
            "Buy_Course":CourseData,
            "tot_price":TotalAmount,
            "accesstoken":localStorage.getItem('token')
        }
        dispatch(CheckoutAction.Checkout_user(CheckoutData)).then(()=>{
            props.history.push("/")
        }).catch((error)=>{})
      };
    return(
        <div>
        <StripeCheckout
        allowRememberMe={false}
        amount={amount}
        billingAddress
        label="Pay with 💳"
        locale="auto"
        name="CourseApp"
        panelLabel="Pay {{amount}}"
        stripeKey={stripeApiKey}
        token={onToken}
        zipCode
        style={{width:'100%',padding:'12px 20px',fontSize:'18px',fontWeight:'700'}}
      /></div>
    )
}
export default withRouter(Checkout)