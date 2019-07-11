import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

import { UserInterface } from './../model/user/user';

const signOptions = {
    issuer: 'homeDev',
    subject: 'authUser',
    audience: 'dev',
    expiresIn: '12H',
    algorithm: 'RS256'
};

/**
 * create authentication token iwth jwt
 * @param userId 
 */
export function createToken(user: UserInterface): string {
    const privateKEY = fs.readFileSync(fs.realpathSync('.') + '/src/config/jwt/private.key', 'utf8');
    return jwt.sign({user}, privateKEY, signOptions);
}

/**
 * verify token if still valid else throw error
 * @param token user auth token
 */
export function verifyToken(token: string): any {
    if (!decode(token)) {
        throw new Error('Invalid token');
    }

    const publicKEY = fs.readFileSync('../config/jwt/public.key', 'utf8');
    const {algorithm, ...otherInfo} = signOptions;

    try {
        return jwt.verify(token, publicKEY, {...otherInfo, algorithms: ['RS256']});
    } catch (error) {
        return new Error('User cannot be verified');
    }
}

/**
 * verify if token is valid
 * @param token 
 */
function decode(token: string): any {
    return jwt.decode(token, {complete: true});
}
