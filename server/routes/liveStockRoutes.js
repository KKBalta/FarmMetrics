const express = require('express');
const router = express.Router();

const livestockController = require('../controllers/liveStockController');
const authenticateToken = require('../middleware/auth');
// Simplified private routes
router.get('/',authenticateToken, livestockController.getAllLivestock);
router.get('/:eartag',authenticateToken, livestockController.getLivestockByEartag);
router.post('/',authenticateToken, livestockController.addLivestock);  
router.put('/:eartag',authenticateToken, livestockController.updateLivestock);
router.delete('/hard/:eartag',authenticateToken, livestockController.hardDeleteLivestock);
router.delete('/:eartag',authenticateToken, livestockController.deleteLivestock);
router.post('/:eartag/restore',authenticateToken, livestockController.restoreLivestock);

module.exports = router;
