import FormContainer from "./components/FormContainer.jsx";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
import configureStore from "./store/configureStore";
import "./styles/style.scss";

const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

// addExpense -> Water bill
store.dispatch(addExpense({ amount: 500, description: "Water bill" }));

// addExpense -> Gas bill
store.dispatch(addExpense({ amount: 300, description: "Gas bill" }));

// setTextFilter -> bill (2 items) -> water (1 item)
store.dispatch(setTextFilter("water"));

// getVisibleExpenses -> print visibles ones to screens
