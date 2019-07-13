import { HttpRequestInterface } from '../helpers/httpRequestHandler';
import sendHttpError, { HttpStatusCodeEnum, handleHttpErrors } from '../helpers/httpErrorHandler';
import { UserServiceImpl } from '../service/userService';
import sendHttpResponse, { HttpResponseInterface } from '../helpers/httpResponseHandler';
import { createToken } from '../helpers/token-helper';
import { isValidPassword, isValidEmail } from '../helpers/validators';

export default function authEndpointHandler(): (httpRequest: HttpRequestInterface) => Promise<HttpResponseInterface> {
    return async function handle(httpRequest: HttpRequestInterface): Promise<HttpResponseInterface> {
        switch (httpRequest.method) {
            case 'POST':
                return login(httpRequest);

            default:
                throw sendHttpError(HttpStatusCodeEnum.NOT_ALLOWED, `${httpRequest.method} not allowed`);
        }
    };

    async function login(httpRequest: HttpRequestInterface): Promise<HttpResponseInterface> {
        try {
            const { email, password } = httpRequest.body;

            if (!isValidPassword(password) || !isValidEmail(email)) {
                throw sendHttpError(HttpStatusCodeEnum.BAD_REQUEST, 'Invalid login form');
            } 

            const user = await new UserServiceImpl().findByEmail(email);
            if (user) {
                const response = {
                    user,
                    token: createToken(user)
                };
                        
                return sendHttpResponse(HttpStatusCodeEnum.OK, response);
            }

            throw sendHttpError(HttpStatusCodeEnum.NOT_FOUND, 'User not found'); 
        } catch (error) {
            return handleHttpErrors(error);
        }
    }
}
