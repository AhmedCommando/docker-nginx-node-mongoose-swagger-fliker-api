import { expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha';

import App from '../../../src/index';

const apiUrl = '/api/v1';

const validUser = {
  email: 'commando@commando.com',
  password: 'passowrd'
};

const invalidUserEmail = {
  'password': 'passowrd',
  firstName: 'commando',
  lastName: 'commando'
};

describe('baseRoute', () => {
  it('should Login User', async () => {
    const res = await request(App).post(`${apiUrl}/login`).send(validUser);
    expect(res.status).to.equal(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.contain('token');
  });

  it('should GET error login user', async () => {
    const res = await request(App).get(`${apiUrl}/login`).send(invalidUserEmail);
    expect(res.status).to.equal(400);
    expect(res.type).to.equal('application/json');
  });
});
