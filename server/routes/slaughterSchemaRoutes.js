const express = require('express');
const router = express.Router();
const slaughterSchemaController = require('../controllers/slaughterSchemaController');

router.get('/', slaughterSchemaController.getAllSlaughters);
router.get('/:slaughter_id', slaughterSchemaController.getSlaughterById);
router.post('/', slaughterSchemaController.addSlaughter);
router.put('/:slaughter_id', slaughterSchemaController.updateSlaughter);
router.delete('/:slaughter_id', slaughterSchemaController.deleteSlaughter);

module.exports = router;
