const express = require('express');
const router = express.Router();
const livestockRasyonController = require('../controllers/livestockRasyonController');

// Route to get all livestock rasyon records
router.get('/', livestockRasyonController.getAll);

// Route to get a single livestock rasyon by its ID
router.get('/:id', livestockRasyonController.getById);

// Route to create a new livestock rasyon record
router.post('/', livestockRasyonController.create);

// Route to update a specific livestock rasyon record
router.put('/:id', livestockRasyonController.update);

// Route to delete a specific livestock rasyon record
router.delete('/:id', livestockRasyonController.delete);

module.exports = router;
