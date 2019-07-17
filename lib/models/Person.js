const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  profileImage: {
    type: String,
    required: false
  }
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
