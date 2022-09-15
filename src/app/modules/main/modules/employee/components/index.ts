
export * from './all-expense';

// Imports
import { AllExpenseComponent } from './all-expense';
import { ActionCellRendererComponent } from './all-expense/cell-renderer/action-cell-renderer.component';
import { StatusCellRendererComponent } from './all-expense/cell-renderer/status-cell-renderer.component';
import { NeedsApprovalComponent } from './needs-approval';

// Export all the components as an array
export const EMPLOYEE_DASHBOARD_COMPONENTS = [
  AllExpenseComponent,
  NeedsApprovalComponent,
  StatusCellRendererComponent,
  ActionCellRendererComponent
];
