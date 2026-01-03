const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createTrip, getTrips, getTrip } = require('../controllers/tripController');

router.post('/', auth, createTrip);
router.get('/', auth, getTrips);
router.get('/:id', auth, getTrip);

module.exports = router;
