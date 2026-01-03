const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUserProfile, updateUserProfile, getUserTrips } = require('../controllers/userController');

router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateUserProfile);
router.get('/trips', auth, getUserTrips); // Redundant if tripRoutes exists, but useful for profile-specific context if needed

module.exports = router;
