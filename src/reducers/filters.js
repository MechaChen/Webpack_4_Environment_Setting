// Filters Reducer
const FiltersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

export default (
  state = FiltersReducerDefaultState,
  { type, text, startDate, endDate }
) => {
  switch (type) {
    case "SET_TEXT_FILETER":
      return { ...state, text: text };
    case "SORT_BY_AMOUNT":
      return { ...state, sortBy: "amount" };
    case "SORY_BY_DATE":
      return { ...state, sortBy: "date" };
    case "SET_START_DATE":
      return { ...state, startDate: startDate };
    case "SET_END_DATE":
      return { ...state, endDate: endDate };
    default:
      return state;
  }
};
