/**
 * exception-registry.constant.ts
 *
 * This file contains all the exception messages that the application uses.
 */

/**
 * Typing for a single exception
 */
export class Exception {
  constructor(
    public code: number,
    public title?: string,
    public message?: string,
    public logMessage?: string
  ){}
}

/**
 *
 *
 * @export
 * @extends {Exception}
 */
export class HttpError extends Exception {
  public response?: Response;

  constructor(code?: number){
    super(code);
  }
}

/**
 * Default exceptions for Http errors
 */
export const DefaultHttpErrors = {
    0: {
        code: 0,
        title: 'Connection Error',
        logMessage: 'Could not connect to the server',
        message: 'Unable to communicate with the server'
    },

    400: {
        code: 400,
        title: 'Request Error',
        logMessage: 'Bad request',
        message: 'Malformed request'
    },

    401: {
        code: 401,
        title: 'Authentication Error',
        logMessage: 'Unauthorized Access',
        message: 'Unauthorized Access'
    },

    404: {
        code: 404,
        title: 'Resource Not Found',
        logMessage: 'Resource Unavailable',
        message: 'The requested resource is unavailable'
    },

    405: {
        code: 405,
        title: 'Method Not Allowed',
        logMessage: 'The HTTP method used to send the request isn\'t allowed on this path',
        message: 'The HTTP method used to send the request isn\'t allowed on this path'
    },

    500: {
        code: 500,
        title: 'Server Error',
        logMessage: 'Server error',
        message: 'Something went wrong while processing the request'
    }
};

/**
 * The exception registry object that contains all the exception entries
 * that is being used in the application
 */
export const ExceptionRegistry = {
    UNAUTH_ACC_DENIED: {
        code: 100,
        title: 'Authentication Error',
        logMessage: 'Invalid credentials',
        message: 'Invalid credentials'
    },

    COMPANY_NOT_FOUND: {
        code: 101,
        title: 'Resource Not Found',
        logMessage: 'Company doesn\'t exist',
        message: 'Company doesn\'t exist'
    }
};
