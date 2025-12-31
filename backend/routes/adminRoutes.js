const express = require('express');
const { getUsers, updateUserStatus } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('admin')); // All routes require admin role

router.get('/users', getUsers);
router.put('/users/:id/status', updateUserStatus);

module.exports = router;
