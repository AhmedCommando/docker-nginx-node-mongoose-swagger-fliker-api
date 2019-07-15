import { HttpRequestInterface } from '../helpers/httpRequestHandler';
import makeFlikr from '../model/flikr/flickr';
import sendHttpError, { HttpStatusCodeEnum, handleHttpErrors } from '../helpers/httpErrorHandler';
import sendHttpResponse, { HttpResponseInterface } from '../helpers/httpResponseHandler';

/**
 * Factory function handles all http methods to flickr endpoint
 */
export default function flikrEndpointHandler(): 
    (httpRequest: HttpRequestInterface, body: any, page: number) => Promise<HttpResponseInterface> {
    return async function handle(httpRequest: HttpRequestInterface, body: any, page: number): Promise<HttpResponseInterface> {
        switch (httpRequest.method) {
            case 'GET':
                return getFlikrData(body, page);

            default:
                throw sendHttpError(HttpStatusCodeEnum.NOT_ALLOWED, `${httpRequest.method} not allowed`);
        }
    };

    /**
     * handle flickr response by page
     * @param body 
     * @param page 
     */
    async function getFlikrData(body: any, page: number): Promise<HttpResponseInterface> {
        try {
            const flikrListData = makeFlikr(JSON.parse(body).items);                
            return sendHttpResponse(HttpStatusCodeEnum.OK, flikrListData, page); 
        } catch (error) {
            return handleHttpErrors(error);
        }
    }
}
