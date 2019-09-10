import { createStore, combineReducers } from "redux";
import uuid from "uuid";

// Action Generators
// ADD_EXPENSE
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0
}) => {
  return {
    type: "ADD_EXPENSE",
    expense: {
      id: uuid(),
      description,
      note,
      amount,
      createdAt
    }
  };
};

// EDIT_EXPENSE
const editExpense = (id, updates) => {
  return {
    type: "EDIT_EXPENSE",
    id,
    updates,
    updates
  };
};

// REMOVE_EXPENSE
const removeExpense = id => {
  return {
    type: "REMOVE_EXPENSE",
    id
  };
};

// SET_TEXT_FILTER
const setTextFilter = (text = "") => {
  return {
    type: "SET_TEXT_FILETER",
    text
  };
};

// SORT_BY_AMOUNT
const sortByAmount = () => {
  return {
    type: "SORT_BY_AMOUNT"
  };
};

// SORT_BY_DATE
const sortByDate = () => {
  return {
    type: "SORY_BY_DATE"
  };
};

// SET_START_DATE
const setStartDate = startDate => {
  return {
    type: "SET_START_DATE",
    startDate
  };
};

// SET_END_DATE
const setEndDate = endDate => {
  return {
    type: "SET_END_DATE",
    endDate
  };
};

// Expenses Reducers
const ExpensesReducerDefaultState = [];

const ExpensesReducer = (state = ExpensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "EDIT_EXPENSE":
      return state.map(expense =>
        expense.id === action.id ? { ...expense, ...action.updates } : expense
      );
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};

// Filters Reducer
const FiltersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

const FiltersReducer = (
  state = FiltersReducerDefaultState,
  { type, text, startDate, endDate }
) => {
  switch (type) {
    case "SET_TEXT_FILETER":
      return { ...state, text };
    case "SORT_BY_AMOUNT":
      return { ...state, sortBy: "amount" };
    case "SORY_BY_DATE":
      return { ...state, sortBy: "date" };
    case "SET_START_DATE":
      return { ...state, startDate };
    case "SET_END_DATE":
      return { ...state, endDate };
    default:
      return state;
  }
};

// Get visible expenses
const getVisibleExpenses = (expenses, { startDate, endDate, text, sortBy }) => {
  return expenses
    .filter(({ createdAt, description }) => {
      const startDateMatch =
        typeof startDate !== "number" || createdAt >= startDate;
      const endDateMatch = typeof endDate !== "number" || createdAt <= endDate;
      const textMatch =
        typeof text !== "string" ||
        description.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") return a.createdAt < b.createdAt ? 1 : -1;
      else if (sortBy === "amount") return a.amount < b.amount ? 1 : -1;
    });
};

// Create Store
const store = createStore(
  combineReducers({
    expenses: ExpensesReducer,
    filters: FiltersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

// Action Firing
const expenseOne = store.dispatch(
  addExpense({ amount: 100, description: "Rent", createdAt: 500 })
);
const expenseTwo = store.dispatch(
  addExpense({ amount: 300, description: "Coffee", createdAt: 100 })
);

// store.dispatch(removeExpense(expenseOne.expense.id));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter("rent"));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1200));

// const demoState = {
//     expenses: [
//       {
//         id: "asldfzcmvowie",
//         description: "January Rent",
//         notes: "This was final payment for that address",
//         amount: 54500,
//         createdAt: 0
//       }
//     ],
//     filters: {
//       text: "rent",
//       sortBy: "amount", // rent or amount
//       startDate: undefined,
//       endDate: undefined
//     }
//   };
