import { createStore } from "redux";

const store = createStore((state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
});
