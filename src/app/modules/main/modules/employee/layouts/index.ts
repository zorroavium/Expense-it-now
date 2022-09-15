export * from './dashboard-layout';
export * from './create-expense';

// Imports
import { EmployeeDashboardComponent } from './dashboard-layout';
import { CreateExpenseComponent } from './create-expense';

// Export all the components as an array
export const EMPLOYEE_DASHBOARD_LAYOUTS = [
    EmployeeDashboardComponent,
    CreateExpenseComponent
];
