import * as express from 'express';
import * as mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

import handleHttpRequest, { HttpRequestInterface } from '../helpers/httpRequestHandler';
import sendHttpError, { HttpStatusCodeEnum } from '../helpers/httpErrorHandler';

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const handleUserRequestParamsMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const httpRequest: HttpRequestInterface = handleHttpRequest(req);
    if (httpRequest.body.userId && ObjectId.isValid(httpRequest.body.userId)) {
        next();
    } else {
        res.status(HttpStatusCodeEnum.BAD_REQUEST)
            .json(sendHttpError(HttpStatusCodeEnum.BAD_REQUEST, 'Invalid request, User id is missing or invalid!')).end();
    } 
};
