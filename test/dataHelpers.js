require('dotenv').config();
const mongoose = require('mongoose');
const seedData = require('./seedData');
const Person = require('../lib/models/Person');
const Dog = require('../lib/models/Dog');

const connect = require('../lib/utils/connect');

beforeAll(() => {
  return connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seedData();
});

afterAll(() => {
  return mongoose.connection.close();
});

const getPerson = () => {
  return Person
    .findOne()
    .then(person => {
      return JSON.parse(JSON.stringify(person));
    });
};

const getDog = () => {
  return Dog
    .findOne()
    .then(dog => JSON.parse(JSON.stringify(dog)));
};

module.exports = {
  getPerson,
  getDog
};
