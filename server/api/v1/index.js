const express = require('express');
const sites = require('./sites');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.use('/sites', sites);

module.exports = router;
