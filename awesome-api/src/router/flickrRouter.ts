// export v1 routes
import * as request from 'request';
import * as express from 'express';

import sendHttpError, { HttpStatusCodeEnum } from '../helpers/httpErrorHandler';
import handleHttpRequest, { HttpRequestInterface } from '../helpers/httpRequestHandler';

const router = express.Router();

router.all('/', handleAuthRouters);

// @todo code duplication
function handleAuthRouters(req: express.Request, res: express.Response): void {
    const httpRequest: HttpRequestInterface = handleHttpRequest(req);
    if (httpRequest.method !== 'GET') {
        res.status(HttpStatusCodeEnum.NOT_ALLOWED)
            .send(sendHttpError(HttpStatusCodeEnum.NOT_ALLOWED, `${httpRequest.method} not allowed`));
    }

    const publicUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&&safe_search=1';
    request.get(publicUrl, (error: any, response: any, body: any) => {
        if (error) {
            res.status(HttpStatusCodeEnum.BAD_REQUEST).send(error);
        }

        res
            .status(200)
            .send(JSON.parse(body));
    });
}

export default router;
