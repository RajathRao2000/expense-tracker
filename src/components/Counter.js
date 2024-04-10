import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/index";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);

  const incrementHandler = (amount) => {
    dispatch(counterActions.increment(amount));
  };

  const decrementHandler = (amount) => {
    dispatch(counterActions.decrement(amount));
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={() => incrementHandler(1)}>Increment</button>
        <button onClick={() => incrementHandler(2)}>IncrementBy2</button>
        <button onClick={() => decrementHandler(1)}>Decrement</button>
        <button onClick={() => decrementHandler(2)}>DecrementBy2</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
