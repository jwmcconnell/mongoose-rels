const Person = require('../lib/models/Person');
const Dog = require('../lib/models/Dog');

const seedPeople = [
  {
    name: 'Jack',
    email: 'jack@test.com',
    city: 'Portland',
    state: 'Oregon',
  }
];

const seedDogs = [
  {
    name: 'Bear',
    age: '13',
    weight: '40 lbs',
  }
];

function seedData() {
  return Promise.all(seedPeople.map(person => {
    const { name, email, city, state, profileImage } = person;
    return Person.create({ name, email, city, state, profileImage });
  }))
    .then(person => {
      return Promise.all(seedDogs.map(dog => {
        const { name, age, weight } = dog;
        return Dog.create({ name, age, weight, owner: person[0]._id });
      }));
    });
}

module.exports = seedData;
