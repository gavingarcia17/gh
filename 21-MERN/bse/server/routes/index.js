const router = require('express').Router();
const userRoutes = require('./api/user-routes');

// Use user routes
router.use('/api', userRoutes);

module.exports = router;