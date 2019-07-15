import { expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha';

import App from '../../../src/index';
import { apiUrl } from '../../helper/fixtures';

// tslint:disable-next-line: max-line-length
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkMmJkZmYyMGIzMjIxMDJlMWVmOWE5ZCIsImZpcnN0TmFtZSI6IkZpcnN0bmFtZSIsImxhc3ROYW1lIjoiTGFzdG5hbWUiLCJlbWFpbCI6ImFobWVkQGRldmVsb3AuY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkN2QzTklHTjlTbS5ia1lOUlEuLnoxT251ZG1waEhGcHlEcmk5QVRGOURTM3RIUVdPYTJiaUsiLCJjcmVhdGVkQXQiOiIyMDE5LTA3LTE1VDAyOjA3OjQ2LjUxNFoiLCJ1cGRhdGVkQXQiOiIyMDE5LTA3LTE1VDAyOjA3OjQ2LjUxNFoiLCJfX3YiOjB9LCJpYXQiOjE1NjMxNjA1OTksImV4cCI6MTU2MzIwMzc5OSwiYXVkIjoiZGV2IiwiaXNzIjoiaG9tZURldiIsInN1YiI6ImF1dGhVc2VyIn0.0xJ9CpYYUmt0biVfLQFlayoKoK-zB94qS0_eKKraoCsH_S5VkRtL3UHpQFnvoEh_UGnfILjAbE521PFn4tE2rg';

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
