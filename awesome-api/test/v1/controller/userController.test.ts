import { expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha';

import App from '../../../src/index';

const apiUrl = '/api/v1';

const validUser = {
  email: 'commando@commando.com',
  password: 'passowrd',
  firstName: 'commando',
  lastName: 'commando'
};

const invalidUserEmail = {
  'password': 'passowrd',
  firstName: 'commando',
  lastName: 'commando'
};

describe('baseRoute', () => {
  it('should POST new User', async () => {
    const res = await request(App).post(`${apiUrl}/user`).send(validUser);
    expect(res.status).to.equal(200);
    expect(res.type).to.equal('application/json');
  });

  it('should GET Error invalid user', async () => {
    const res = await request(App).get(`${apiUrl}/user`).send(invalidUserEmail);
    expect(res.status).to.equal(400);
    expect(res.type).to.equal('application/json');
  });
});
