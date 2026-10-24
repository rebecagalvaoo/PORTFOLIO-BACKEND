const express = require('express');
const router = express.Router();
const controller = require('../controllers/references');

router.get('/', controller.referencesList);
router.get('/:id', controller.getByID);
router.post('/', controller.processAdd);
router.put('/:id', controller.processEdit);
router.delete('/:id', controller.processDelete);

module.exports = router;
