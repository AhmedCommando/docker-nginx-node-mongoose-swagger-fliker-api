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
            case 'DELETE':
                return deleteUser(httpRequest);
            case 'PUT':
                return updateUser(httpRequest);

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

    async function deleteUser(httpRequest: HttpRequestInterface): Promise<HttpResponseInterface> {
        try {
            const userId = httpRequest.pathParams.userId;
            new UserServiceImpl().deleteById(userId).then((err) => {
                if (err) {
                    return handleHttpErrors(err);
                }
                return sendHttpResponse(HttpStatusCodeEnum.OK, `User with the id ${userId} has been deleted`);
            });
        } catch (error) {
            return handleHttpErrors(error);
        }
    }

    /**
     * @todo finish implementing update user
     * @param httpRequest 
     */
    async function updateUser(httpRequest: HttpRequestInterface): Promise<HttpResponseInterface> {
        const userId = httpRequest.pathParams.userId;
        return sendHttpResponse(HttpStatusCodeEnum.OK, `User with the id ${userId} has been updated`);
    }
}
