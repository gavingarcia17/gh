// filepath: /Users/gavingarcia/Desktop/bootcamp/UCI-VIRT-FSF-PT-06-2023-U-LOLC/21-mern/bse/server/routes/api/user-routes.js
const router = require('express').Router();
const {
  getSingleUser,
  createUser,
  login,
} = require('../../controllers/user-controller');

// Route to get a single user
router.route('/user/:id').get(getSingleUser);

// Route to create a new user
router.route('/signup').post(createUser);

// Route to login a user
router.route('/login').post(login);

module.exports = router;