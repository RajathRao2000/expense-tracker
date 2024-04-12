import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cartItems";
import axios from "axios";
import keys from "../../keys";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { title, price, description } = props;
  const cartItems = useSelector((state) => state.cart.list);

  const AddToCart = async () => {
    // try {
    //   const res = await axios.put(`${keys.firebaseApi}.json`, {
    //     val:[...cartItems,
    //     props,]
    //   });
    //   console.log(res.data)
      dispatch(cartActions.addToCart(props));
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={AddToCart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
