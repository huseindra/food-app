import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import React, { useContext } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'
import { useState } from 'react/cjs/react.development'

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState (false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const cartCtx = useContext(CartContext)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)
    }

    const cartItemAddHandler  = item => {
        cartCtx.addItem({...item, amount:1})
    }

    const checkoutHandler = () => {
        setIsCheckout(true)
    }
    const cartItem = <ul className={classes['cart-items']}>
    {cartCtx.items.map((item) => 
        <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />
    )}</ul>

    const hasItems = cartCtx.items.length > 0

    const modalActions =  <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
   {hasItems &&  <button className={classes.button} onClick={checkoutHandler}>Order</button>}
</div>

    const submitOrderHandler = async (userData) => {
        setIsSubmit(true)
        await fetch('https://react-87d88-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItem: cartCtx.items
            })
        })
        setIsSubmit(false) 
        setDidSubmit(true)

    }

    const cartModalContent = (
        <React.Fragment>
            {cartItem}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}

            {!isCheckout && modalActions}
        </React.Fragment>
    )

    const isSubmittingModalContent = <p>Sending order data...</p>

    const didSubmitModalContent = <React.Fragment>
    <p>Successfully sent the order</p>
    <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>Close</button>
    </div>
    </React.Fragment> 
    return(
       <Modal onClose={props.onClose}>
            {!isSubmit &&  !didSubmit && cartModalContent}
            {isSubmit && isSubmittingModalContent}
            {!isSubmit && didSubmit && didSubmitModalContent}
       </Modal>
    )
}

export default Cart