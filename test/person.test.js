const { getPerson } = require('./dataHelpers');
const request = require('supertest');
const app = require('../lib/app');
const Person = require('../lib/models/Person');
const Dog = require('../lib/models/Dog');

describe('person routes', () => {
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
    const { _id, name, email } = await Person.create({ name: 'obiwan', email: 'obiwan@test.com' });
    const dogs = await Dog.create([
      { name: 'spot', age: 5, weight: '20 lbs', owner: _id },
      { name: 'rover', age: 10, weight: '50 lbs', owner: _id },
    ]);

    return request(app)
      .get(`/api/v1/people/${_id}`)
      .then(res => {
        const dogsJSON = JSON.parse(JSON.stringify(dogs));
        dogsJSON.forEach(dog => {
          expect(res.body.dogs).toContainEqual(dog);
        });
        expect(res.body).toEqual(expect.objectContaining({
          _id: _id.toString(),
          name,
          email,
          dogs: expect.any(Array),
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
