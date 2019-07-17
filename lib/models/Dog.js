const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    rel: 'Person',
    required: true
  }
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
