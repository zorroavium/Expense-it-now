
import { throwError as observableThrowError, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

import { DefaultHttpErrors, Exception, HttpError } from '../constants';

/**
 * The class performs some common HTTP related utility
 * tasks
 *
 * @export
 */
export abstract class HttpUtil {

  public static extractData<T>(res: HttpResponse<T>): T {
    return res.body as T;
  }

  /**
   * Get the response code from an error response. If the error isn't
   * a http response, it returns -1
   *
   */
  public static getResponseCode(err: any): number {
    return (err instanceof Response) ? (err as Response).status : -1;
  }

  /**
   * Converts error response to an ErrorObservable based on the responseCode
   *
   */
  public static transformErrorResponse(err: any, errors: { [code: number]: Exception } = {}): Observable<never> {
    const errCode: number = HttpUtil.getResponseCode(err);
    if (-1 === errCode) {
      return observableThrowError(err);
    } else if (errors[errCode]) {
      const error: HttpError = errors[errCode];
      error.response = err;
      return observableThrowError(error);
    } else {
      const error: HttpError = HttpUtil.getHttpDefaultError(errCode);
      error.response = err;
      return observableThrowError(error);
    }
  }

  /**
   * Get the default HTTP error object defined using the
   * response code
   *
   */
  public static getHttpDefaultError(code: number): HttpError {
    const httpError: Exception = DefaultHttpErrors[code];
    if (!httpError) {
      throw new Error(`No default exception object available for response code ${code}`);
    }
    return httpError;
  }

  /**
   * Parses URL string
   * @memberOf HttpUtil
   */
  public static parseUrl(url: string): Partial<HTMLAnchorElement>{
    const anchorElem: HTMLAnchorElement = document.createElement('a');
    anchorElem.href = url;
    return {
      protocol: anchorElem.protocol,
      hostname: anchorElem.hostname,
      port: anchorElem.port,
      pathname: anchorElem.pathname
    };
  }

}
