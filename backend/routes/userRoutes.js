const express = require('express');
const { updateDetails, updatePassword } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All routes are protected

router.put('/profile', updateDetails);
router.put('/updatepassword', updatePassword);

module.exports = router;
