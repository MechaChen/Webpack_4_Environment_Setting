// Get visible expenses
export default (expenses, { startDate, endDate, text, sortBy }) => {
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
