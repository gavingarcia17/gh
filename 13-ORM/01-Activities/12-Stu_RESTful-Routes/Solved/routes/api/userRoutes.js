const router = require('express').Router();
const User = require('../../models/User');

// GET a user
// /api/users/:id
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// This route uses async/await with try/catch for errors
// along with HTTP status codes
// /api/users POST
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    // 200 status code means the request is successful
    res.status(200).json(userData);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(400).json(err);
  }
});

// UPDATE a user
router.put('/:id', async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
