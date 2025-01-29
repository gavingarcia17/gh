// filepath: /Users/gavingarcia/Desktop/bootcamp/UCI-VIRT-FSF-PT-06-2023-U-LOLC/14-MVC/tech-blog/controllers/homeRoutes.js
const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;