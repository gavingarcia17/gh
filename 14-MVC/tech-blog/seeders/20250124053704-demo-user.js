// filepath: /Users/gavingarcia/Desktop/bootcamp/UCI-VIRT-FSF-PT-06-2023-U-LOLC/14-MVC/tech-blog/seeders/YYYYMMDDHHMMSS-demo-user.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'demoUser',
        password: 'password123', // Note: In a real application, passwords should be hashed
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};