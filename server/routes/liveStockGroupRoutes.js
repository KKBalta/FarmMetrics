const express = require('express');
const router = express.Router();

const liveStockGroupController = require('../controllers/liveStockGroupController');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, liveStockGroupController.getAllLiveStockGroups);
router.get('/:live_stock_id', authenticateToken, liveStockGroupController.getLiveStockGroupByLiveStockId);
router.post('/', authenticateToken, liveStockGroupController.addLiveStockGroup);
router.put('/:live_stock_id/:group_id', authenticateToken, liveStockGroupController.updateLiveStockGroup);
router.delete('/:live_stock_id/:group_id', authenticateToken, liveStockGroupController.deleteLiveStockGroup);

module.exports = router;
