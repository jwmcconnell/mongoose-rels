const { getPerson } = require('./dataHelpers');
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
        expect(res.body[0]).toEqual(expect.objectContaining({
          _id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
          __v: 0
        }));
      });
  });

  it('returns a person by their id', async() => {
    const { _id, name, email } = await getPerson();
    return request(app)
      .get(`/api/v1/people/${_id}`)
      .then(res => {
        expect(res.body).toEqual(expect.objectContaining({
          _id,
          name,
          email,
          __v: 0
        }));
      });
  });

  it('updates a user and returns the user', async() => {
    const { _id } = await getPerson();
    return request(app)
      .put(`/api/v1/people/${_id}`)
      .send({
        name: 'Updated',
        email: 'updated@test.com',
        city: 'Cleveland',
        state: 'Ohio',
        profileImage: 'profileimage.com/image.jpg'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Updated',
          email: 'updated@test.com',
          city: 'Cleveland',
          state: 'Ohio',
          profileImage: 'profileimage.com/image.jpg',
          __v: 0
        });
      });
  });

  it('deletes a user and returns the user', async() => {
    const { _id, name, email } = await getPerson();
    return request(app)
      .delete(`/api/v1/people/${_id}`)
      .then(res => {
        expect(res.body).toEqual(expect.objectContaining({
          _id: expect.any(String),
          name,
          email,
          __v: 0
        }));
      });
  });
});
