
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {Observable, of } from 'rxjs';


// Application internal imports
import { HttpUtil } from '../util/http.util';

/**
 *
 * @class ApiDataService
 */
@Injectable()
export class ApiDataService {

  constructor(private http: HttpClient) { }

  /**
   * Fetch the resource via HTTP
   *
   * @param {string} url: The resource url
   * @param {boolean} cacheFirst: Flag to use the cache first rather than making an API call
   * @param {T} cache: The object that is to be used as a cache
   * @private
   */
  fetchResource<T>(url: string, params?: HttpParams, testing = false): Observable<any> {
    if (!url || 0 === url.trim().length) {
      throw new Error('Invalid resource url');
    }

    if (testing) {
      return of([]);
    }

    return this.http.get(url, (params) ? { params } : {}).pipe(
      map(res => res),
      catchError(this.handleError),
    );
  }

  saveResource<T>(url: string, data: any, params?: HttpParams): Observable<any> {
    if (!url || 0 === url.trim().length) {
      throw new Error('Invalid resource url');
    }

    return this.http
      .post(url, data, (params) ? {
        params
      } : {}).pipe(
      catchError(this.handleError));
  }

  updateResource<T>(url: string, data: any, params?: HttpParams): Observable<any> {
    if (!url || 0 === url.trim().length) {
      throw new Error('Invalid resource url');
    }

    return this.http
      .put(url, data, (params) ? {
        params
      } : {}).pipe(
      catchError(this.handleError));
  }

  deleteResource<T>(url: string, data: any, params?: HttpParams): Observable<any> {
    if (!url || 0 === url.trim().length) {
      throw new Error('Invalid resource url');
    }

    return this.http
      .request('delete', url, { body: data }).pipe(
      catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return HttpUtil.transformErrorResponse(error);
  }

}
