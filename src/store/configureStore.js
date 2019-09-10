import { createStore, combineReducers } from "redux";
import ExpensesReducer from "../reducers/expenses";
import FiltersReducer from "../reducers/filters";

// Create Store
export default () => {
  const store = createStore(
    combineReducers({
      expenses: ExpensesReducer,
      filters: FiltersReducer
    })
  );

  return store;
};
