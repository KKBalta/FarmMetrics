const express = require('express');
const router = express.Router();
const monthlyWeightController = require('../controllers/monthlyWeightController');
const authenticateToken = require('../middleware/auth');

router.get('/',authenticateToken, monthlyWeightController.getAllWeights);
router.get('/:record_id',authenticateToken, monthlyWeightController.getWeightById);
router.post('/',authenticateToken, monthlyWeightController.addWeight);
router.put('/:record_id',authenticateToken, monthlyWeightController.updateWeight);
router.delete('/:record_id',authenticateToken, monthlyWeightController.deleteWeight);
router.get('/daily-gain/all',authenticateToken, monthlyWeightController.getDailyGainAll);
router.get('/daily-gain/:eartag',authenticateToken, monthlyWeightController.getDailyGain);
router.get('/daily-gain-avg/:eartag',authenticateToken, monthlyWeightController.getDailyGainAvg);

module.exports = router;
