const Person = require('../lib/models/Person');

const seedPeople = [
  {
    name: 'Jack',
    email: 'jack@test.com',
    city: 'Portland',
    state: 'Oregon',
  }
];

function seedData() {
  return Promise.all(seedPeople.map(meme => {
    const { name, email, city, state, profileImage } = meme;
    return Person.create({ name, email, city, state, profileImage });
  }));
}

module.exports = seedData;
