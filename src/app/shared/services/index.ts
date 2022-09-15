import { ApiDataService } from './api-data.service';
import { EmployeeService } from './employee.service';
import { LoginService } from './login.service';
import { NavbarService } from './navbar.service';

export const SHARED_SERVICES = [
  LoginService,
  EmployeeService,
  NavbarService,
  ApiDataService
];
