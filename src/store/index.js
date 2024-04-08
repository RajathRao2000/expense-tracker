import { createStore } from "redux";
const conuterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  } else if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  } else if (action.type === "INCREMENTBY2") {
    return {
      counter: state.counter + 2,
    };
  } else if (action.type === "DECREMENTBY2") {
    return {
      counter: state.counter - 2,
    };
  } else if (action.type === "incrementby5") {
    return {
      counter: state.counter + 5,
    };
  } else if (action.type === "decrementby5") {
    return {
      counter: state.counter - 5,
    };
  }

  return state;
};

const store = createStore(conuterReducer);

const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

export default store;
