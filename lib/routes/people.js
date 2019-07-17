const { Router } = require('express');
const Person = require('../models/Person');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, email, city, state, profileImage } = req.body;
    Person
      .create({ name, email, city, state, profileImage })
      .then(person => res.send(person))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Person
      .find()
      .then(people => res.send(people))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Person
      .findById(req.params.id)
      .then(person => res.send(person))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    const { name, email, city, state, profileImage } = req.body;
    Person
      .findByIdAndUpdate(req.params.id, { name, email, city, state, profileImage }, { new: true })
      .then(person => res.send(person))
      .catch(next);
  });
