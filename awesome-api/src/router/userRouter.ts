
// export v1 routes

import * as express from 'express';

import handleHttpRequest, { HttpRequestInterface } from '../helpers/httpRequestHandler';
import { HttpResponseInterface } from '../helpers/httpResponseHandler';
import userEndpointHandler from '../controller/userController';
import logger from '../utils/winston-logger';

const router = express.Router();

router.all('/', handleUserRouters);

function handleUserRouters(req: express.Request, res: express.Response): void {
    const httpRequest: HttpRequestInterface = handleHttpRequest(req);
    const userHandler = userEndpointHandler();
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
