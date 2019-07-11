import * as bcrypt from 'bcryptjs';

import { HttpRequestInterface } from '../helpers/httpRequestHandler';
import sendHttpError, { HttpStatusCodeEnum, UniqueConstraintError } from '../helpers/httpErrorHandler';
import makeUser, { UserInterface } from '../model/user/user';
import { UserServiceImpl } from '../service/userService';
import sendHttpResponse, { HttpResponseInterface } from '../helpers/httpResponseHandler';
import { createToken } from '../helpers/token-helper';
import logger from '../utils/winston-logger';

export default function userEndpointHandler(): (httpRequest: HttpRequestInterface) => Promise<HttpResponseInterface> {
    return async function handle(httpRequest: HttpRequestInterface): Promise<HttpResponseInterface> {
        switch (httpRequest.method) {
            case 'POST':
                return postUser(httpRequest);

            default:
                throw sendHttpError(HttpStatusCodeEnum.NOT_ALLOWED, `${httpRequest.method} not allowed`);
        }
    };

    async function postUser(httpRequest: HttpRequestInterface): Promise<HttpResponseInterface> {
        try {
            const user = makeUser(httpRequest.body, bcrypt);
            const newUser = await new UserServiceImpl().addUser(user);
            const token = createToken(newUser);
            const response = {
                user: newUser,
                token
            };
                    
            return sendHttpResponse(HttpStatusCodeEnum.CREATED, response);
        } catch (error) {
            if (error.code === 11000) {
                throw sendHttpError(HttpStatusCodeEnum.BAD_REQUEST, 'User already exist');
            }
            const statusCode = error instanceof UniqueConstraintError ? HttpStatusCodeEnum.CONFLICT : HttpStatusCodeEnum.BAD_REQUEST;
            throw sendHttpError(statusCode, error.message);
        }
    }
}
