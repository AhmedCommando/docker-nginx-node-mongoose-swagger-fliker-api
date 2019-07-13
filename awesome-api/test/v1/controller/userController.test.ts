import { expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha';

import App from '../../../src/index';
import { HttpStatusCodeEnum } from '../../../src/helpers/httpErrorHandler';
import { validUser, invalidUserEmail, apiUrl } from '../../helper/fixtures';

describe('User Route', () => {
  let duplicateUser;
  it('should POST new User', async () => {
    duplicateUser = validUser;
    const res = await request(App).post(`${apiUrl}/user`).send(validUser);
    expect(res.status).to.equal(HttpStatusCodeEnum.CREATED);
    expect(res.type).to.equal('application/json');
  });

  it('should POST dupicate user and fail', async () => {
    duplicateUser = validUser;
    const res = await request(App).post(`${apiUrl}/user`).send(duplicateUser);
    expect(res.status).to.equal(HttpStatusCodeEnum.CONFLICT);
    expect(res.type).to.equal('application/json');
  });

  it('should POST invalid user and fail', async () => {
    const res = await request(App).post(`${apiUrl}/user`).send(invalidUserEmail);
    expect(res.status).to.equal(HttpStatusCodeEnum.BAD_REQUEST);
    expect(res.type).to.equal('application/json');
  });
});
