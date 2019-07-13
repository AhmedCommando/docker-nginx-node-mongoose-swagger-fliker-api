import { expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha';

import App from '../../../src/index';
import { apiUrl, registeredUser, invalidUserEmail } from '../../helper/fixtures';

describe('Auth Route', () => {
  it('should Login User', async () => {
    const res = await request(App).post(`${apiUrl}/auth`).send(registeredUser);
    expect(res.status).to.equal(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.includes.all.keys(['token', 'user']);
  });

  it('should GET error login user', async () => {
    const res = await request(App).post(`${apiUrl}/auth`).send(invalidUserEmail);
    expect(res.status).to.equal(400);
    expect(res.type).to.equal('application/json');
  });
});
