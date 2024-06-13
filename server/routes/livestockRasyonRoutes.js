const express = require('express');
const router = express.Router();
const livestockRasyonController = require('../controllers/livestockRasyonController');
const authenticateToken = require('../middleware/auth');

// Other routes...

router.get('/', authenticateToken, livestockRasyonController.getAll);
router.get('/:id', authenticateToken, livestockRasyonController.getById);
router.get('/eartag/:eartag', authenticateToken, livestockRasyonController.getByEartag);
router.get('/eartag/:eartag/all', authenticateToken, livestockRasyonController.getAllByEartag); // New route
router.post('/', authenticateToken, livestockRasyonController.create);
router.put('/:id', authenticateToken, livestockRasyonController.update);
router.delete('/:id', authenticateToken, livestockRasyonController.delete);

// Add this route to handle changing rasyon by eartag
router.put('/eartag/:eartag/changeRasyon', authenticateToken, livestockRasyonController.changeRasyon);

module.exports = router;
