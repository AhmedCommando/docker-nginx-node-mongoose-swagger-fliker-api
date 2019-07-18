
// export v1 routes

import * as express from 'express';
const router = express.Router();

import handleHttpRequest, { HttpRequestInterface } from '../helpers/httpRequestHandler';
import { HttpResponseInterface } from '../helpers/httpResponseHandler';
import userEndpointHandler from '../controller/userController';
import { UserServiceImpl } from '../service/userService';
import { authMiddleware, handleUserRequestParamsMiddleware } from '../middleware';

router.put('/', [authMiddleware, handleUserRequestParamsMiddleware, handleUserRouters]);
router.delete('/', [authMiddleware, handleUserRequestParamsMiddleware, handleUserRouters]);
router.all('/', handleUserRouters);

function handleUserRouters(req: express.Request, res: express.Response): void {
    const httpRequest: HttpRequestInterface = handleHttpRequest(req);
    const userHandler = userEndpointHandler(new UserServiceImpl());
    userHandler(httpRequest)
        .then(({headers, statusCode, data}: HttpResponseInterface) =>
            res
                .set(headers)
                .status(statusCode)
                .send({ statusCode, data}))
        .catch((error: HttpResponseInterface) => {
            const {headers, statusCode, ...rest} = error;
            res.set(headers).status(statusCode).send({...rest, statusCode});
        });
}

export default router;
