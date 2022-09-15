import { API_ENDPOINTS } from 'app/shared/constants';

/**
 * Type for the JSON backend path configuration entry
 */
export type MockPathConfig = {
    hosts: Array<string>;
    path: string;
    jsonPath: string;
    jsonError?: boolean;
}

/**
 * The JSON mock routes configuration
 */
export const MOCK_PATHS: MockPathConfig[] = [
    {
        hosts: ['localhost', 'abc.localhost', '192.168.137.1', '172.16.9.67'],
        path: API_ENDPOINTS.LOGIN,
        jsonPath: '/assets/json/user.json'
    },
    {
      hosts: ['localhost', 'abc.localhost', '192.168.137.1', '172.16.9.67'],
      path: API_ENDPOINTS.CREATE_EXPENSE,
      jsonPath: '/assets/json/user.json'
    },
    {
      hosts: ['localhost', 'abc.localhost', '192.168.137.1', '172.16.9.67'],
      path: API_ENDPOINTS.ALL_EXPENSE,
      jsonPath: '/assets/json/your-expense.json'
    }
];
