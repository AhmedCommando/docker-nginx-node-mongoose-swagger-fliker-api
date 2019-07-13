import { HttpRequestInterface } from '../helpers/httpRequestHandler';
import sendHttpResponse, { HttpResponseInterface } from '../helpers/httpResponseHandler';
import sendHttpError, { HttpStatusCodeEnum, handleHttpErrors } from '../helpers/httpErrorHandler';
import makeFlikr from '../model/flikr/flickr';

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

    async function getFlikrData(body: any, page: number): Promise<HttpResponseInterface> {
        try {
            const flikrListData = makeFlikr(JSON.parse(body).items);                
            return sendHttpResponse(HttpStatusCodeEnum.OK, flikrListData, page); 
        } catch (error) {
            return handleHttpErrors(error);
        }
    }
}
