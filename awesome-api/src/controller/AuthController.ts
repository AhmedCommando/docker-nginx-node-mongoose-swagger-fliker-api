import { HttpRequestInterface } from '../helpers/httpRequestHandler';
import sendHttpError, { HttpStatusCodeEnum, UniqueConstraintError } from '../helpers/httpErrorHandler';
import { UserServiceImpl } from '../service/userService';
import sendHttpResponse, { HttpResponseInterface } from '../helpers/httpResponseHandler';
import { createToken } from '../helpers/token-helper';
import logger from '../utils/winston-logger';
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
            console.error(httpRequest.body);
            if (!isValidPassword(password) || !isValidEmail(email)) {
                throw sendHttpError(HttpStatusCodeEnum.BAD_REQUEST, 'Invalid login form');
            }
            const user = await new UserServiceImpl().findByEmail(email);
            if (user) {
                const token = createToken(user);
                const response = {
                    user,
                    token
                };
                        
                return sendHttpResponse(HttpStatusCodeEnum.CREATED, response);
            }
        } catch (error) {
            const statusCode = error instanceof UniqueConstraintError ? HttpStatusCodeEnum.CONFLICT : HttpStatusCodeEnum.BAD_REQUEST;
            throw sendHttpError(statusCode, error.message);
        }
    }
}
