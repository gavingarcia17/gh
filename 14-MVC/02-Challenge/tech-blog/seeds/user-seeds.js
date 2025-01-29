const { User } = require('../models');

const userData = [
  {
    username: 'techguy',
    password: 'password123',
  },
  {
    username: 'devgal',
    password: 'password456',
  },
  {
    username: 'coder123',
    password: 'password789',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;