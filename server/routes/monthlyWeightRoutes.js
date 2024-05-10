const express = require('express');
const router = express.Router();
const monthlyWeightController = require('../controllers/monthlyWeightController');

router.get('/', monthlyWeightController.getAllWeights);
router.get('/:record_id', monthlyWeightController.getWeightById);
router.post('/', monthlyWeightController.addWeight);
router.put('/:record_id', monthlyWeightController.updateWeight);
router.delete('/:record_id', monthlyWeightController.deleteWeight);
router.get('/daily-gain/all', monthlyWeightController.getDailyGainAll);
router.get('/daily-gain/:eartag', monthlyWeightController.getDailyGain);
router.get('/daily-gain-avg/:eartag', monthlyWeightController.getDailyGainAvg);

module.exports = router;
