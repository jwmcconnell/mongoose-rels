const { Router } = require('express');
const Person = require('../models/Person');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, email, city, state, profileImage } = req.body;
    Person
      .create({ name, email, city, state, profileImage })
      .then(person => res.send(person))
      .catch(next);
  });
