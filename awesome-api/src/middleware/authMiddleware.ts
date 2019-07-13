import * as express from 'express';

import { HttpStatusCodeEnum } from './../helpers/httpErrorHandler';
import { verifyToken } from '../helpers/token-helper';
import handleHttpRequest, { HttpRequestInterface } from '../helpers/httpRequestHandler';
import sendHttpError from '../helpers/httpErrorHandler';

const errorResponse = (res: express.Response) => 
    res.status(HttpStatusCodeEnum.UNAUTHORIZED)
        .json(sendHttpError(HttpStatusCodeEnum.UNAUTHORIZED, 'Unauthorized to access data')).end(); 

export const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const httpRequest: HttpRequestInterface = handleHttpRequest(req);

    let token = httpRequest.headers['x-access-token'] || httpRequest.headers['authorization'];
    if (!token) {
        return errorResponse(res);
    }

    // Remove Bearer from string
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    try {
        console.error(verifyToken(token));
        if (verifyToken(token)) {
            next();
        } else {
            return errorResponse(res);
        }
    } catch (errors) {
        return errorResponse(res);
    }
};
