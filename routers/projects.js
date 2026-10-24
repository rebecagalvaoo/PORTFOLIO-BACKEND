const express = require('express');
const router = express.Router();

const projectsController = require('../controllers/projects');

router.get('/', projectsController.projectsList);
router.get('/:id', projectsController.getByID);
router.put('/:id', projectsController.processEdit);
router.delete('/:id', projectsController.processDelete);
router.post('/', projectsController.processAdd);

module.exports = router;
