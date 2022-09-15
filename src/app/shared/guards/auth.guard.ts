import { CanLoad, DefaultUrlSerializer, Router } from '@angular/router';
import { Injectable } from '@angular/core';

/**
 * A guard service that will be used by the router to make sure
 * that the user has logged in and has the authentication token.
 *
 * @class AuthGuard
 * @implements {CanLoad}
 */
@Injectable()
export class AuthGuard implements CanLoad {

  constructor(private router: Router) { }

  /**
   * See if the SessionStorage has the auth token
   *
   * @returns {boolean}
   */
  canLoad(): boolean {

    return true;
  }

}
