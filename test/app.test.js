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

  it('returns a list of all people', () => {
    return request(app)
      .get('/api/v1/people')
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
        expect(res.body[0]).toEqual({
          _id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
          city: expect.any(String),
          state: expect.any(String),
          __v: 0
        });
      });
  });
});
