import * as bcrypt from 'bcryptjs';

import { HttpRequestInterface } from '../helpers/httpRequestHandler';
import sendHttpError, { HttpStatusCodeEnum, handleHttpErrors } from '../helpers/httpErrorHandler';
import { UserServiceImpl } from '../service/userService';
import sendHttpResponse, { HttpResponseInterface } from '../helpers/httpResponseHandler';
import { createToken } from '../helpers/token-helper';
import makeUser from '../model/user/user';

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
            const result = await new UserServiceImpl().addUser(user);
            const newUser = result.toObject();
            delete newUser.password;
            const token = createToken(newUser);
            const response = {
                user: newUser,
                token
            };
                    
            return sendHttpResponse(HttpStatusCodeEnum.CREATED, response);
        } catch (error) {
            return handleHttpErrors(error);
        }
    }
}
