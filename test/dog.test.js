const { getPerson } = require('./dataHelpers');
const request = require('supertest');
const app = require('../lib/app');

describe('dog routes', () => {
  it('creates and returns a dog', async() => {
    const { _id } = await getPerson();
    return request(app)
      .post('/api/v1/dogs')
      .send({ name: 'Delilah', age: 8, weight: '20 lbs', owner: _id })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Delilah',
          age: 8,
          weight: '20 lbs',
          owner: _id,
          __v: 0
        });
      });
  });
});
