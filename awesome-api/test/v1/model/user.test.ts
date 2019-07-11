import { expect } from 'chai';
import 'mocha';

import makeUser from '../../../src/model/user/user';

describe('baseRoute', () => {
    it('should return invalid first name', async () => {
        const nonValidFirstname = { 
            firstName: 'a7med', 
            lastName: 'bejaoui', 
            email: 'ahmed@bejaoui.com',
            userName: 'ahmedbejaoui'
        };
        expect(makeUser.bind(makeUser, nonValidFirstname))
            .to
            .throw(TypeError, `A user's first name must be a string and have at least 3 characters long.`);  
    });

    it('should return invalid email', async () => {
        const nonValidEmail = { 
            firstName: 'ahmed', 
            lastName: 'bejaoui', 
            email: 'ahmed.com',
            userName: 'ahmedbejaoui'
        };
        expect(makeUser.bind(makeUser, nonValidEmail))
            .to
            .throw(TypeError, 'Invalid user email address.');  
    });

    it('should return valid user', async () => {
        const validUser = { 
            firstName: 'ahmed', 
            lastName: 'bejaoui', 
            email: 'ahmed@bejaoui.com',
            userName: 'ahmedbejaoui'
        };
        expect(typeof (makeUser.bind(makeUser, validUser)))
            .to
            .equals('function'); 
    });
});
