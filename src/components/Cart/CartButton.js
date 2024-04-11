import classes from './CartButton.module.css';
import {useSelector,useDispatch} from "react-redux"
import { cartActions } from '../store/cartItems';


const CartButton = (props) => {
  const dispatch=useDispatch()
  const cart=useSelector(state=>state.cart)
  return (
    <button onClick={()=>dispatch(cartActions.showcart())} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cart.list.length}</span>
    </button>
  );
};

export default CartButton;
