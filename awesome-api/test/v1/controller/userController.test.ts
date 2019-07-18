import { expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha';

import App from '../../../src/index';
import { HttpStatusCodeEnum } from '../../../src/helpers/httpErrorHandler';
import { validUser, invalidUserEmail, apiUrl, userToUpdate } from '../../helper/fixtures';

// tslint:disable-next-line: max-line-length
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkMzBlNmE1OGVkMTIyMDdiODdmZmU1YyIsImZpcnN0TmFtZSI6IkFobWVkIiwibGFzdE5hbWUiOiJCZWphb3VpIiwiZW1haWwiOiJhaG1lZEBkZXZlbG9wLmNvbSIsImNyZWF0ZWRBdCI6IjIwMTktMDctMThUMjE6Mzc6NDEuMzkwWiIsInVwZGF0ZWRBdCI6IjIwMTktMDctMThUMjE6Mzc6NDEuMzkwWiIsIl9fdiI6MH0sImlhdCI6MTU2MzQ4NTg2MSwiZXhwIjoxNTYzNTI5MDYxLCJhdWQiOiJkZXYiLCJpc3MiOiJob21lRGV2Iiwic3ViIjoiYXV0aFVzZXIifQ.2ImbB4F8tMBifjS_snIXEomuVj4bODx2CJ5PXf_IS5c-o7u8_psOltFIZhi99wbvx0CYGfpEHBwadIUC4X7d3Q';

describe('User Route', () => {
  let duplicateUser;
  let existingUserId: string;
  it('should POST new User', async () => {
    duplicateUser = validUser;
    const res = await request(App).post(`${apiUrl}/user`).send(validUser);
    expect(res.status).to.equal(HttpStatusCodeEnum.CREATED);
    expect(res.type).to.equal('application/json');
    existingUserId = res.body.data.user._id;
  });

  it('should POST dupicate user and fail', async () => {
    const res = await request(App).post(`${apiUrl}/user`).send(duplicateUser);
    expect(res.status).to.equal(HttpStatusCodeEnum.CONFLICT);
    expect(res.type).to.equal('application/json');
  });

  it('should POST invalid user and fail', async () => {
    const res = await request(App).post(`${apiUrl}/user`).send(invalidUserEmail);
    expect(res.status).to.equal(HttpStatusCodeEnum.BAD_REQUEST);
    expect(res.type).to.equal('application/json');
  });

  it('should UPDATE existing user', async () => {
    const res = await request(App).put(`${apiUrl}/user`).send(userToUpdate(existingUserId)).set('x-access-token', token);
    expect(res.status).to.equal(HttpStatusCodeEnum.OK);
    expect(res.type).to.equal('application/json');
  });

  it('should FAIL UPDATE existing user', async () => {
    const res = await request(App).put(`${apiUrl}/user`).send(userToUpdate('existingUserId')).set('x-access-token', token);
    expect(res.status).to.equal(HttpStatusCodeEnum.BAD_REQUEST);
    expect(res.type).to.equal('application/json');
  });

  it('should FAIL DELETE existing user', async () => {
    const res = await request(App).delete(`${apiUrl}/user`).send(userToUpdate('existingUserId')).set('x-access-token', token);
    expect(res.status).to.equal(HttpStatusCodeEnum.BAD_REQUEST);
    expect(res.type).to.equal('application/json');
  });

  it('should DELETE existing user', async () => {
    const res = await request(App).put(`${apiUrl}/user`).send(userToUpdate(existingUserId)).set('x-access-token', token);
    expect(res.status).to.equal(HttpStatusCodeEnum.OK);
    expect(res.type).to.equal('application/json');
  });
});
