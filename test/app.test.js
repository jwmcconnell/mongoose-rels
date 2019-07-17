require('./dataHelpers');
const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
  it('creates and returns a person', () => {
    return request(app)
      .post('/api/v1/people')
      .send({
        name: 'Lance',
        email: 'lance@test.com',
        city: 'Portland',
        state: 'Oregon'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Lance',
          email: 'lance@test.com',
          city: 'Portland',
          state: 'Oregon',
          __v: 0
        });
      });
  });
});
