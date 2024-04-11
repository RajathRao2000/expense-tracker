import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cartlist = useSelector((state) => state.cart.list);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {!!cartlist.length ? (
          cartlist.map((cartitem) => {
            console.log(cartitem)
            return (
              <CartItem
                item={{
                  title: cartitem.title,
                  quantity: cartitem.quantity,
                  total: cartitem.quantity * cartitem.price,
                  price: cartitem.price,
                }}
              />
            );
          })
        ) : (
          <p>No Items in cart</p>
        )}
      </ul>
    </Card>
  );
};

export default Cart;
