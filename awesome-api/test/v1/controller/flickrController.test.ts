import { expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha';

import App from '../../../src/index';
import { apiUrl } from '../../helper/fixtures';

// tslint:disable-next-line: max-line-length
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkMzBlNmE1OGVkMTIyMDdiODdmZmU1YyIsImZpcnN0TmFtZSI6IkFobWVkIiwibGFzdE5hbWUiOiJCZWphb3VpIiwiZW1haWwiOiJhaG1lZEBkZXZlbG9wLmNvbSIsImNyZWF0ZWRBdCI6IjIwMTktMDctMThUMjE6Mzc6NDEuMzkwWiIsInVwZGF0ZWRBdCI6IjIwMTktMDctMThUMjE6Mzc6NDEuMzkwWiIsIl9fdiI6MH0sImlhdCI6MTU2MzQ4NTg2MSwiZXhwIjoxNTYzNTI5MDYxLCJhdWQiOiJkZXYiLCJpc3MiOiJob21lRGV2Iiwic3ViIjoiYXV0aFVzZXIifQ.2ImbB4F8tMBifjS_snIXEomuVj4bODx2CJ5PXf_IS5c-o7u8_psOltFIZhi99wbvx0CYGfpEHBwadIUC4X7d3Q';

describe('Flickr Route', () => {
  it('should GET data', async () => {
    const res = await request(App).get(`${apiUrl}/flickr`).set('x-access-token', token);
    expect(res.status).to.equal(200);
    expect(res.type).to.equal('application/json');
    const {data} = res.body;
    expect(data).to.have.length.above(0);
    expect(data[0]).to.includes.all.keys(['title', 'link', 'description', 'authorName', 'authorLink', 'image', 'tags']);
  });

  it('should GET page', async () => {
    const res = await request(App).get(`${apiUrl}/flickr?page=1`).set('x-access-token', token);
    expect(res.status).to.equal(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.contain.any.keys(['page']);
    expect(res.body.page).to.equal(1);
  });
});
