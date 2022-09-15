export interface CreateExpenseState {
  newExpense: {};
}

export const initializeState = (): CreateExpenseState => {
  return { newExpense: null };
};
