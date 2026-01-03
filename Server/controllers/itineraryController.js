const { ItineraryItem, Trip } = require('../models');

exports.createItem = async (req, res) => {
    try {
        const { tripId } = req.params;
        const { type, description, startDate, endDate, budget, location } = req.body;

        // Verify trip ownership
        const trip = await Trip.findByPk(tripId);
        if (!trip) return res.status(404).json({ msg: 'Trip not found' });
        if (trip.userId !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        const item = await ItineraryItem.create({
            tripId,
            type,
            description,
            startDate,
            endDate,
            budget,
            location
        });
        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getItems = async (req, res) => {
    try {
        const { tripId } = req.params;
        // Verify trip ownership (optional strictness, but good practice)
        const trip = await Trip.findByPk(tripId);
        if (!trip) return res.status(404).json({ msg: 'Trip not found' });
        if (trip.userId !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        const items = await ItineraryItem.findAll({ where: { tripId } });
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await ItineraryItem.findByPk(id);
        if (!item) return res.status(404).json({ msg: 'Item not found' });

        // Verify trip ownership via item -> trip
        const trip = await Trip.findByPk(item.tripId);
        if (trip.userId !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        await item.destroy();
        res.json({ msg: 'Item removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
