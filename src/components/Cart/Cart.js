import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import { useContext } from 'react'
import CartContext from '../../store/cart-context'


const Cart = (props) => {
const cartCtx = useContext(CartContext)

const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

    const cartItem = <ul className={classes['cart-items']}>{cartCtx.items.map((item) => <li key={Math.random()}>{item.name}</li>)}</ul>
    const hasItems = cartCtx.items.length > 0

    return(
       <Modal onClose={props.onClose}>
            {cartItem}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
               {hasItems &&  <button className={classes.button}>Order</button>}
            </div>
       </Modal>
    )
}

export default Cart