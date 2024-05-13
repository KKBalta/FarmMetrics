const express = require('express');
const router = express.Router();
const slaughterSchemaController = require('../controllers/slaughterSchemaController');
const authenticateToken = require('../middleware/auth');


router.get('/',authenticateToken, slaughterSchemaController.getAllSlaughters);
router.get('/:slaughter_id',authenticateToken, slaughterSchemaController.getSlaughterById);
router.post('/',authenticateToken, slaughterSchemaController.addSlaughter);
router.put('/:slaughter_id',authenticateToken, slaughterSchemaController.updateSlaughter);
router.delete('/:slaughter_id',authenticateToken, slaughterSchemaController.deleteSlaughter);

module.exports = router;
