import * as bcrypt from 'bcryptjs';

import { createToken, verifyToken } from '../helpers/token-helper';
import { HttpRequestInterface } from '../helpers/httpRequestHandler';
import { isValidPassword, isValidEmail } from '../helpers/validators';
import { UserServiceImpl } from '../service/userService';
import sendHttpError, { HttpStatusCodeEnum, handleHttpErrors } from '../helpers/httpErrorHandler';
import sendHttpResponse, { HttpResponseInterface } from '../helpers/httpResponseHandler';

/**
 * factory function handle all allowed http requests to auth endpoint
 */
export default function authEndpointHandler(): (httpRequest: HttpRequestInterface) => Promise<HttpResponseInterface> {
    return async function handle(httpRequest: HttpRequestInterface): Promise<HttpResponseInterface> {
        switch (httpRequest.method) {
            case 'POST':
                return login(httpRequest);
            case 'GET':
                return handleGetRequest(httpRequest);

            default:
                throw sendHttpError(HttpStatusCodeEnum.NOT_ALLOWED, `${httpRequest.method} not allowed`);
        }
    };

    /**
     * Handle login
     * @param httpRequest 
     */
    async function login(httpRequest: HttpRequestInterface): Promise<HttpResponseInterface> {
        try {
            const { email, password } = httpRequest.body;
            if (!isValidPassword(password) || !isValidEmail(email)) {
                throw sendHttpError(HttpStatusCodeEnum.BAD_REQUEST, 'Invalid login form');
            } 

             const user = await new UserServiceImpl().findByEmail(email);
            if (user && bcrypt.compareSync(password, user.password)) {
                const response = {
                    user,
                    token: createToken(user)
                };
                            
                return sendHttpResponse(HttpStatusCodeEnum.OK, response);
            }

            if (!user) {
                throw sendHttpError(HttpStatusCodeEnum.NOT_FOUND, 'User not found'); 
            }

            throw sendHttpError(HttpStatusCodeEnum.BAD_REQUEST, 'Invalid user email or password');
        } catch (error) {
            return handleHttpErrors(error);
        }
    }

    /**
     * handle get request to accept only /me get request
     * @param httpRequest 
     */
    async function handleGetRequest(httpRequest: HttpRequestInterface): Promise<HttpResponseInterface> {
        if (httpRequest.path.indexOf('me') > 0) {
            let token = httpRequest.headers['x-access-token'];
            if (!token) {
                throw sendHttpError(HttpStatusCodeEnum.UNAUTHORIZED, 'Unauthorized to access data');
            }

            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            }

            try {
                return sendHttpResponse(HttpStatusCodeEnum.OK, verifyToken(token).user);
            } catch (error) {
                throw sendHttpError(HttpStatusCodeEnum.UNAUTHORIZED, 'Unauthorized to access data');
            }
        }
        throw sendHttpError(HttpStatusCodeEnum.NOT_ALLOWED, `${httpRequest.method} not allowed`);
    }
}
