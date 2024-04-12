import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
import { useSelector } from "react-redux";

const Products = (props) => {
  const cartList = useSelector((state) => state.product);
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {!!cartList.list.length ? (
          cartList.list.map((item) => {
            return (
              <ProductItem
                title={item.title}
                price={item.price}
                description={item.description}
              />
            );
          })
        ) : (
          <p>No items in cart</p>
        )}
      </ul>
    </section>
  );
};

export default Products;
