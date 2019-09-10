// Expenses Reducers
const ExpensesReducerDefaultState = [];

export default (state = ExpensesReducerDefaultState, action) => {
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
