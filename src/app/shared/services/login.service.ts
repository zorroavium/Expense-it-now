
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../constants';


@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user: any): Observable<any> {
    return this.http.get(API_ENDPOINTS.LOGIN, {...user});
  }

}
