const Router = require('express').Router;

const authenticate = require('../middleware/authenticate');

const router = new Router();

router.get('/api/testauth', authenticate, async (req, res) => {
  console.log('req.user', req.user);
  console.log('req.token', req.token);

  res.send('WE GUCCI 🐱‍👓');
});

module.exports = router;
