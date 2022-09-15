
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../constants';


@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllExpenses(): Observable<any> {
    return this.http
      .get(API_ENDPOINTS.ALL_EXPENSE);
  }

  createExpense(user: any): Observable<any> {
    return this.http
      .get(API_ENDPOINTS.CREATE_EXPENSE, {...user});
  }

}
