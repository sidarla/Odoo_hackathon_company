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

exports.updateTrip = async (req, res) => {
    try {
        const { status, coverPhoto, name, description, place, startDate, endDate } = req.body;
        const trip = await Trip.findByPk(req.params.id);
        
        if (!trip) return res.status(404).json({ msg: 'Trip not found' });
        if (trip.userId !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        // Update fields if provided
        if (status) trip.status = status;
        if (coverPhoto) trip.coverPhoto = coverPhoto;
        if (name) trip.name = name;
        if (description) trip.description = description;
        if (place) trip.place = place;
        if (startDate) trip.startDate = startDate;
        if (endDate) trip.endDate = endDate;

        await trip.save();
        res.json(trip);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

