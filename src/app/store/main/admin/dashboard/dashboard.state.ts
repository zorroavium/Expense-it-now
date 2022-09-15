import { ApiResourceState } from 'app/store';

export interface DashboardState extends ApiResourceState {
  expense: [];
  selectedIndex: number;
}

const intialDashboardState = { loading: false, loaded: false, error: null };

export const initializeDashboardState = (): DashboardState => {
  return { expense: null, ...intialDashboardState, selectedIndex: 0 };
};
