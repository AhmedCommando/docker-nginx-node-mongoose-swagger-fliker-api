import { generateString, generateEmail } from './generateFixture';

export const apiUrl = `/api/${process.env.API_VERSION}`;

export const validUser = {
    email: generateEmail(),
    password: generateString(7),
    firstName: generateString(5, 'string'),
    lastName: generateString(5, 'string')
};
  
export const invalidUserEmail = {
    password: generateString(5),
    firstName: generateString(5, 'string'),
    lastName: generateString(5, 'string')
};

export const registeredUser = {
    'password': 'password',
    'email': 'ahmed@develop.com'
};
