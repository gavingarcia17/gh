const { Post } = require('../models');

const postData = [
  {
    title: 'Understanding MVC Architecture',
    content: 'Model-View-Controller (MVC) is a software architectural pattern that separates an application into three main logical components...',
    userId: 1,
  },
  {
    title: 'Getting Started with Sequelize',
    content: 'Sequelize is a promise-based Node.js ORM that supports various SQL dialects. It provides an easy way to interact with databases...',
    userId: 2,
  },
  {
    title: 'Deploying Applications to Heroku',
    content: 'Heroku is a cloud platform that enables developers to build, run, and operate applications entirely in the cloud...',
    userId: 1,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;