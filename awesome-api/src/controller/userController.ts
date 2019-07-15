import * as bcrypt from 'bcryptjs';

import { createToken } from '../helpers/token-helper';
import { HttpRequestInterface } from '../helpers/httpRequestHandler';
import { UserServiceImpl } from '../service/userService';
import makeUser from '../model/user/user';
import sendHttpError, { HttpStatusCodeEnum, handleHttpErrors } from '../helpers/httpErrorHandler';
import sendHttpResponse, { HttpResponseInterface } from '../helpers/httpResponseHandler';

/**
 * factory function handles all allowed methods to user endpoint
 */
export default function userEndpointHandler(): (httpRequest: HttpRequestInterface) => Promise<HttpResponseInterface> {
    return async function handle(httpRequest: HttpRequestInterface): Promise<HttpResponseInterface> {
        switch (httpRequest.method) {
            case 'POST':
                return postUser(httpRequest);

            default:
                throw sendHttpError(HttpStatusCodeEnum.NOT_ALLOWED, `${httpRequest.method} not allowed`);
        }
    };

    /**
     * Add new user
     * @param httpRequest 
     */
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
