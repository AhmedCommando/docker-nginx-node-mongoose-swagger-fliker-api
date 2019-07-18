import * as bcrypt from 'bcryptjs';

import { createToken } from '../helpers/token-helper';
import { HttpRequestInterface } from '../helpers/httpRequestHandler';
import makeUser from '../model/user/user';
import sendHttpError, { HttpStatusCodeEnum, handleHttpErrors } from '../helpers/httpErrorHandler';
import sendHttpResponse, { HttpResponseInterface } from '../helpers/httpResponseHandler';
import { UserServiceImpl } from '../service/userService';
import { encryptPassword } from '../helpers/crypto';

/**
 * factory function handles all allowed methods to user endpoint
 */
// tslint:disable-next-line: max-line-length
export default function userEndpointHandler(userServiceImpl: UserServiceImpl): (httpRequest: HttpRequestInterface) => Promise<HttpResponseInterface> {
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
            const result = await userServiceImpl.addUser(user);
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
            if (await userServiceImpl.deleteById(httpRequest.body.userId)) {
                return sendHttpResponse(HttpStatusCodeEnum.OK, `User with the id ${httpRequest.body.userId} has been deleted`);
            }
            
            throw sendHttpError(HttpStatusCodeEnum.NOT_FOUND, `User with the id ${httpRequest.body.userId} not found`);
        } catch (error) {
            return handleHttpErrors(error);
        }
    }

    /**
     * @todo implement joi as a better solution for request data validation
     * @param httpRequest 
     */
    async function updateUser(httpRequest: HttpRequestInterface): Promise<HttpResponseInterface> {
        try {
            const {userId, ...user} = httpRequest.body;
            if ('password' in user) {
                user.password = encryptPassword(bcrypt, user.password);
            }

            const newUser = await userServiceImpl.updateUser(userId, user);
            if (newUser) {
                return sendHttpResponse(HttpStatusCodeEnum.OK, newUser);
            }

            throw sendHttpError(HttpStatusCodeEnum.NOT_FOUND, `User with the id ${userId} not found`);
        } catch (error) {
            return handleHttpErrors(error);
        }
    }
}
