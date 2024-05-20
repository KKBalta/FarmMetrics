const express = require('express');
const router = express.Router();
const rasyonComponentsController = require('../controllers/rasyonComponentsController');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, rasyonComponentsController.getAllComponents);
router.get('/:id', authenticateToken, rasyonComponentsController.getComponentById);
router.get('/rasyon/:rasyon_id', authenticateToken, rasyonComponentsController.getComponentsByRasyonId); // New route
router.post('/', authenticateToken, rasyonComponentsController.addComponent);
router.put('/:id', authenticateToken, rasyonComponentsController.updateComponent);
router.delete('/:id', authenticateToken, rasyonComponentsController.deleteComponent);

module.exports = router;
