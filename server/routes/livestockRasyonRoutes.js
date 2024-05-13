const express = require('express');
const router = express.Router();
const livestockRasyonController = require('../controllers/livestockRasyonController');
const authenticateToken = require('../middleware/auth');
// Route to get all livestock rasyon records
router.get('/',authenticateToken, livestockRasyonController.getAll);

// Route to get a single livestock rasyon by its ID
router.get('/:id',authenticateToken, livestockRasyonController.getById);

// Route to create a new livestock rasyon record
router.post('/',authenticateToken, livestockRasyonController.create);

// Route to update a specific livestock rasyon record
router.put('/:id',authenticateToken, livestockRasyonController.update);

// Route to delete a specific livestock rasyon record
router.delete('/:id',authenticateToken, livestockRasyonController.delete);

module.exports = router;
