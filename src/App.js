import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import keys from "./keys";
import { cartActions } from "./components/store/cartItems";
import { uiAction } from "./components/store/ui-slice";
import Notification from "./components/UI/Notification";

let initial = true;
let count=0

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    axios
      .get(`${keys.firebaseApi}.json`)
      .then((res) => {
        dispatch(cartActions.getAllCart(res.data));
        // initial=false
      })
      .catch((error) => console.log("error in get", error));
  }, []);

  useEffect(() => {
    count++
    console.log(count,"}")
    if (count>2) {
      dispatch(
        uiAction.showNotification({
          status: "pending",
          title: "Sending...",
          message: "sending cart data!",
        })
      );
    

    axios
      .put(`${keys.firebaseApi}.json`, {
        ...cart.list,
      })
      .then((res) => {

          dispatch(
            uiAction.showNotification({
              status: "success",
              title: "success!",
              message: "sent cart data successfully!",
            })
          );



        console.log("put success", res.data);
      })
      .catch((error) => {
          dispatch(
            uiAction.showNotification({
              status: "error",
              title: "Error!",
              message: "Sending cart data failed!",
            })
          );
          console.log("error in post", error);
        
      });
    }
  }, [cart]);

  return (
    <Fragment>
      {/* {console.log("notification value", notification)} */}
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cart.showcart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
