import * as request from 'request';
import * as express from 'express';

import handleHttpRequest, { HttpRequestInterface } from '../helpers/httpRequestHandler';
import flikrEndpointHandler from '../controller/flikrController';
import sendHttpError, { HttpStatusCodeEnum } from '../helpers/httpErrorHandler';

const router = express.Router();

router.all('/', handleAuthRouters);

const publicUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&&safe_search=1&tagmode=all';

function handleAuthRouters(req: express.Request, res: express.Response): void {
    const httpRequest: HttpRequestInterface = handleHttpRequest(req);
    const flikerEndpointHandler = flikrEndpointHandler();
    
    // @todo create a shared reusable adapter for handling pages and other query params like filters
    const { page } = httpRequest.queryParams; 
    const path = (page && !isNaN(page) && page > 0) ? 
        `${publicUrl}?page=${parseInt(page, 10)}` : publicUrl; 
    try {
        request.get(path, async (error: any, response: any, body: any) => {
            if (error) {
                throw sendHttpError(HttpStatusCodeEnum.BAD_REQUEST, 'Cannot reach flikr service');
            }
            
            const {headers, ...result} = await flikerEndpointHandler(httpRequest, body, (parseInt(page, 10) || 1));
            return res
                .set(headers)
                .status(result.statusCode)
                .send(result);
        });
    } catch (error) {
        const {headers, statusCode, ...rest} = error;
        res.set(headers).status(statusCode).send({...rest, statusCode});
    }
}

export default router;
