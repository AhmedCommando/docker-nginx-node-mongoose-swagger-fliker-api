
// export v1 routes

import * as express from 'express';

import handleHttpRequest, { HttpRequestInterface } from '../helpers/httpRequestHandler';
import { HttpResponseInterface } from '../helpers/httpResponseHandler';
import authEndpointHandler from '../controller/AuthController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.all('/', handleAuthRouters);
router.get('/me', handleAuthRouters);

// @todo code duplication
function handleAuthRouters(req: express.Request, res: express.Response): void {
    const httpRequest: HttpRequestInterface = handleHttpRequest(req);
    const userHandler = authEndpointHandler();
    userHandler(httpRequest)
        .then(({headers, statusCode, data}: HttpResponseInterface) =>
            res
                .set(headers)
                .status(statusCode)
                .send(data))
        .catch((error: HttpResponseInterface) => {
            const {headers, statusCode, ...rest} = error;
            res.set(headers).status(statusCode).send({...rest, statusCode});
        });
}

export default router;
