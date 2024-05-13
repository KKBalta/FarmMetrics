const express = require('express');
const router = express.Router();
const rasyonController = require('../controllers/rasyonController');
const authenticateToken = require('../middleware/auth');

router.get('/',authenticateToken, rasyonController.getAllRasyons);
router.get('/:id',authenticateToken, rasyonController.getRasyonById);
router.post('/',authenticateToken, rasyonController.addRasyon);
router.put('/:id',authenticateToken, rasyonController.updateRasyon);
router.delete('/:id',authenticateToken, rasyonController.deleteRasyon);

module.exports = router;
