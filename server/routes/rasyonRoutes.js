const express = require('express');
const router = express.Router();
const rasyonController = require('../controllers/rasyonController');

router.get('/', rasyonController.getAllRasyons);
router.get('/:id', rasyonController.getRasyonById);
router.post('/', rasyonController.addRasyon);
router.put('/:id', rasyonController.updateRasyon);
router.delete('/:id', rasyonController.deleteRasyon);

module.exports = router;
