const { getPerson, getDog } = require('./dataHelpers');
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

  it('returns all dogs', () => {
    return request(app)
      .get('/api/v1/dogs')
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
        expect(res.body[0]).toEqual({
          _id: expect.any(String),
          name: expect.any(String),
          age: expect.any(Number),
          weight: expect.any(String),
          owner: expect.any(String),
          __v: 0
        });
      });
  });

  it('returns a dog by their id', async() => {
    const { _id } = await getDog();
    return request(app)
      .get(`/api/v1/dogs/${_id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: expect.any(String),
          age: expect.any(Number),
          weight: expect.any(String),
          owner: expect.any(String),
          __v: 0
        });
      });
  });
});
