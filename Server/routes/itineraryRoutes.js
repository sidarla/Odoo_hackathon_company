const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth');
const { createItem, getItems, deleteItem } = require('../controllers/itineraryController');

// Routes will be mounted as /api/trips/:tripId/items
router.post('/', auth, createItem);
router.get('/', auth, getItems);
router.delete('/:id', auth, deleteItem);

module.exports = router;
