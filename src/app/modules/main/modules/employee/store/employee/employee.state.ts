export interface EmployeeState {
  allExpenses: [];
}

export const initializeState = (): EmployeeState => {
  return { allExpenses: [] };
};
