const { Trip, User } = require('../models');

exports.createTrip = async (req, res) => {
    try {
        const { name, startDate, endDate, place, description, coverPhoto } = req.body;
        const trip = await Trip.create({
            name,
            startDate,
            endDate,
            place,
            description,
            coverPhoto,
            userId: req.user.id
        });
        res.json(trip);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getTrips = async (req, res) => {
    try {
        const trips = await Trip.findAll({ where: { userId: req.user.id } });
        res.json(trips);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getTrip = async (req, res) => {
    try {
        const trip = await Trip.findByPk(req.params.id);
        if (!trip) return res.status(404).json({ msg: 'Trip not found' });
        // Check user ownership
        if (trip.userId !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
        res.json(trip);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
