import { HttpResponseInterface } from './httpResponseHandler';

/**
 * http status response
 */
export enum HttpStatusCodeEnum {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    NOT_ALLOWED = 405,
    CONFLICT = 409
}

/**
 * helper to build http error response
 * @param statusCode int
 * @param errorMessage string
 */
export default function sendHttpError (statusCode: number, errorMessage: string): HttpResponseInterface {
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode,
      data: [],
      error: errorMessage
    };
}

/**
 * handle mongoose unique constraint error
 */
export class UniqueConstraintError extends Error {
  constructor (value: any) {
    super(`${value} must be unique.`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UniqueConstraintError);
    }
  }
}

/**
 * handle all controllers http errors
 * @param error 
 */
export function handleHttpErrors(error: any): HttpResponseInterface {
  let statusCode = error.statusCode || HttpStatusCodeEnum.BAD_REQUEST;
  let errorsMsg = error.message || error.error;
  if (error instanceof UniqueConstraintError || error.code === 11000) {
      errorsMsg = 'Data already exist';
      statusCode = HttpStatusCodeEnum.CONFLICT;
  } 
  throw sendHttpError(statusCode, errorsMsg);
}
