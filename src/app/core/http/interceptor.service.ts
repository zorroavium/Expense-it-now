import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, timer } from 'rxjs';
import { catchError, materialize, delay, dematerialize, filter, take, tap, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { AppConfig } from 'app/config';
import { NotificationsService } from 'angular2-notifications';
import { API_ENDPOINTS } from 'app/shared';
import { Router } from '@angular/router';

const noftificationConfig = {
  timeOut: 5000,
  animate: 'scale',
  pauseOnHover: true
};

@Injectable()
export class InterceptorService implements HttpInterceptor {

  private readonly timeFrame = 1500; /* 1.5 second time frame */
  private readonly KEYS_TO_CHECK_URL = ['search?searchString', 'dupCheck', 'request?userName='];
  private availableThreads = 5; /* 5 requests per the time frame */
  private rateLimit$ = new BehaviorSubject(this.availableThreads);

  constructor(private notify: NotificationsService, private router: Router) { }

  /**
  * Handles HTTP response
   * @param {HttpRequest<any>} : request
   * @param {HttpHandler} : next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Add the Content-Type header to the request options
      request = request.clone({
        setHeaders: {
          'Content-Type':  'application/json;charset=UTF-8'
        }
      });

      request = this.setAuthHeaders(request);


      if (this.KEYS_TO_CHECK_URL.some(key => request.urlWithParams.includes(key))) {

        // throttle large number of API requests into a batch size of 5
        return this.rateLimit$.pipe(
          filter(() => this.availableThreads > 0),
          take(1),
          tap(() => this.removeThreads()),
          tap(() => timer(this.timeFrame).subscribe(() => this.addThreads())),
          mergeMap(() => next.handle(request))
        )
        .pipe(catchError(this.handleError.bind(this, request)));

    } else {

      // wrap in delayed observable to simulate server api call
      // call materialize and dematerialize to ensure delay even if an error is thrown
      return next.handle(request)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize())
        .pipe(catchError(this.handleError.bind(this, request)));

    }

  }

  handleError(request: HttpResponse<any>, error: HttpErrorResponse) {
    let errorStatusCode = +error.status;

    if (0 === errorStatusCode) {

      // Notify the user with a message
      this.notify.error('Connection Error', 'Unable to communicate with the server', noftificationConfig);

    } else if (401 === errorStatusCode) {

      this.handleError401(request);

    } else if (500 === errorStatusCode) {

      this.handleError500(error);
    }

    return throwError(error);
  }

  private handleError401(request: HttpResponse<any>) {
    // const allowedUrls = [API_ENDPOINTS.AUTHENTICATION_ENDPOINT, API_ENDPOINTS.VALIDATE_USER];

    // if (-1 === allowedUrls.indexOf(request.url)) {
    //   this.notify.error('Authentication Error', 'Redirecting you to the login page', noftificationConfig);

    //   /*
    //   * Using window.location.href to redirect inplace of angular router. The application
    //   * reinitializes and hence resets the references
    //   */
    //   window.location.href = AppConfig.BASE_PATH;
    // }
  }

  private handleError500(error: HttpErrorResponse) {
    if (error && error.error && error.error.includes('This search would return a large number of records')) {
      this.notify.error('Server Error', 'This search would return a large number of records.  Please narrow the search',
         noftificationConfig);
    } else {
      this.notify.error('Server Error', 'Something went wrong while processing the request', noftificationConfig);
    }
  }

  private setAuthHeaders(request: HttpRequest<any>): HttpRequest<any> {
     // Retrieve the User and Auth token from the SessionStorage
    //  let user: User = StorageUtil.getAttribute<User>(StorageType.SESSION, StorageKeys.LOGGED_IN_USER);
    //  let token: string = StorageUtil.getAttribute<string>(StorageType.SESSION, StorageKeys.AUTH_TOKEN);

    //  // If there exist a User and Token in the SessionStorage then add the Authorization header
    //  if (user && token) {

    //    request = request.clone({
    //      setHeaders: {
    //        'Authorization': (window['btoa']) ? 'Basic ' + btoa(`${user.userName}:${token}`) : ''
    //      }
    //    });
    //  }

     return request;
  }

  private addThreads(): void {
    this.changeThreads(1);
  }

  private removeThreads(): void {
    this.changeThreads(-1);
  }

  private changeThreads(value: number): void {
    this.rateLimit$.next(this.availableThreads += value);
  }

}
