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

export const userToUpdate = (userId) => {
    return {
        userId,
        firstName: 'Ahmed Khalil'
    };
};

export const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlOTliNTEwYmZiN2EzMDA4NjBiNDRmMSIsImZpcnN0TmFtZSI6IkFobWVkIiwibGFzdE5hbWUiOiJCZWphb3VpIiwiZW1haWwiOiJhaG1lZEBkZXZlbG9wLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjAtMDQtMTdUMTM6NTQ6MjQuNDk1WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDQtMTdUMTM6NTQ6MjQuNDk1WiIsIl9fdiI6MH0sImlhdCI6MTU4NzEzMTY2NCwiZXhwIjoxNTg3MTc0ODY0LCJhdWQiOiJkZXYiLCJpc3MiOiJob21lRGV2Iiwic3ViIjoiYXV0aFVzZXIifQ.IEOQgz33wTywT4iBm7FHp5ShwT-kpXlQZ_knlTvSby-rE7rls0O90i4CbmahKmYrPbvsWEH6SCgVO76nr54SYA';