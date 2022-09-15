import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { Injectable } from '@angular/core';

import * as minimatch from 'minimatch';
import { MockPathConfig, MOCK_PATHS } from 'app/config';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class BackendService implements HttpInterceptor {

  constructor(private notify: NotificationsService) { }

  /**
  * Handles HTTP response
   * @param {HttpRequest<any>} : request
   * @param {HttpHandler} : next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(new HttpRequest('GET', this.getJsonUrl(request.url)))
    .pipe(catchError(this.handleError.bind(this)));
  }

  handleError(err: HttpErrorResponse) {
    const errorStatusCode = +err.status;

    if (errorStatusCode === 0) {
      // Notify the user with a message
      this.notify.error('Connection Error', 'Unable to communicate with the server');
    }

    return throwError(err);
  }

  getJsonUrl(url: string): string {
    const hostName = window.location.hostname,
      mockedPath: MockPathConfig = MOCK_PATHS.find((config: MockPathConfig) => {
          return config.jsonError ? null : ((config.hosts.indexOf(hostName) >= 0) && minimatch(url, config.path));
        }
      );
    return mockedPath ? mockedPath.jsonPath : '/error.json';
  }

}
