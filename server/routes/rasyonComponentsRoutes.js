const express = require('express');
const router = express.Router();
const rasyonComponentsController = require('../controllers/rasyonComponentsController');
const authenticateToken = require('../middleware/auth'); // Assume you have an authentication middleware

router.get('/', authenticateToken, rasyonComponentsController.getAllComponents);
router.get('/:id', authenticateToken, rasyonComponentsController.getComponentById);
router.post('/', authenticateToken, rasyonComponentsController.addComponent);
router.put('/:id', authenticateToken, rasyonComponentsController.updateComponent);
router.delete('/:id', authenticateToken, rasyonComponentsController.deleteComponent);

module.exports = router;
