const express = require('express');
const router = express.Router();

const farmerController = require('../controllers/farmerController');
const authenticateToken = require('../middleware/auth');

// public roots
router.post('/signup', farmerController.signup);
router.post('/login', farmerController.login);

// private routes
router.get('/', authenticateToken, farmerController.getAllFarmers);
router.get('/:id', authenticateToken, farmerController.getFarmerById);
router.put('/:id', authenticateToken, farmerController.updateFarmer);
router.delete('/:id', authenticateToken, farmerController.deleteFarmer);


module.exports = router;
