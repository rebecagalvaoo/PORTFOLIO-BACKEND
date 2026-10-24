
const express = require('express');
const router = express.Router();

router.use('/references', require('./references'));
router.use('/projects', require('./projects'));
router.use('/services', require('./services'));
router.use('/users', require('./users'));

module.exports = router;
