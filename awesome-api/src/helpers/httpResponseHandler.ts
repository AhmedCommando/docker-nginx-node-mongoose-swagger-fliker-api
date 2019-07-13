/**
 * Http response interface
 */
export interface HttpResponseInterface {
    headers: {};
    page?: number;
    statusCode: number;
    data: {};
    error?: string;
}

/**
 * http success response helper
 * @param statusCode int
 * @param body 
 */
export default function sendHttpResponse (statusCode: number, body: any, page: number = 1): HttpResponseInterface {
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      page,
      statusCode,
      data: body
    };
}
