const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

router.get('/', controller.usersList);
router.get('/:id', controller.getByID);
router.post('/', controller.processAdd);
router.put('/:id', controller.processEdit);
router.delete('/:id', controller.processDelete);

module.exports = router;
