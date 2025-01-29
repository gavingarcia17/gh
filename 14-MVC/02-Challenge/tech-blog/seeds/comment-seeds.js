const { Comment } = require('../models');

const commentData = [
  {
    content: "Great post! Very informative.",
    userId: 1,
    postId: 1,
  },
  {
    content: "I learned a lot from this article.",
    userId: 2,
    postId: 1,
  },
  {
    content: "Thanks for sharing your insights!",
    userId: 1,
    postId: 2,
  },
  {
    content: "This is exactly what I needed to read today.",
    userId: 3,
    postId: 2,
  },
  {
    content: "Looking forward to more posts like this.",
    userId: 2,
    postId: 3,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;