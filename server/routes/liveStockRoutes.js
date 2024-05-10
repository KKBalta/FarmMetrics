const express = require('express');
const router = express.Router();

const livestockController = require('../controllers/liveStockController');

// Simplified private routes
router.get('/', livestockController.getAllLivestock);
router.get('/:eartag', livestockController.getLivestockByEartag);
router.post('/',livestockController.addLivestock);  
router.put('/:eartag', livestockController.updateLivestock);
router.delete('/hard/:eartag', livestockController.hardDeleteLivestock);
router.delete('/:eartag', livestockController.deleteLivestock);
router.post('/:eartag/restore', livestockController.restoreLivestock);

module.exports = router;
