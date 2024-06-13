const express = require('express');
const router = express.Router();

const groupController = require('../controllers/groupController');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, groupController.getAllGroups);
router.get('/:group_id', authenticateToken, groupController.getGroupById);
router.post('/', authenticateToken, groupController.addGroup);
router.put('/:group_id', authenticateToken, groupController.updateGroup);
router.delete('/:group_id', authenticateToken, groupController.deleteGroup);

module.exports = router;
