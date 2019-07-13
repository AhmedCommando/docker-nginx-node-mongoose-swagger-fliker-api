import { expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha';

import App from '../../../src/index';
import { apiUrl } from '../../helper/fixtures';

describe('Flickr Route', () => {
  it('should GET data', async () => {
    const res = await request(App).get(`${apiUrl}/flickr`);
    expect(res.status).to.equal(200);
    expect(res.type).to.equal('application/json');
    const {data} = res.body;
    expect(data).to.have.length.above(0);
    expect(data[0]).to.includes.all.keys(['title', 'link', 'description', 'authorName', 'authorLink', 'image', 'tags']);
  });

  it('should GET page', async () => {
    const res = await request(App).get(`${apiUrl}/flickr?page=1`);
    expect(res.status).to.equal(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.contain.any.keys(['page']);
    expect(res.body.page).to.equal(1);
  });
});
