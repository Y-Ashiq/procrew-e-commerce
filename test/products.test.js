import request from 'supertest';
import app from './../index.js'

describe('GET api/v1/products', () => {
  it('should return a list of products', async () => {
    const response = await request(app).get('/api/v1/products');
    console.log(response.body); 
  });
});
