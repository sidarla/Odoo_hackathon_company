const { User, Trip } = require('../models');

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const { firstName, lastName, phone, city, country, additionalInfo } = req.body;

        let user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.phone = phone || user.phone;
        user.city = city || user.city;
        user.country = country || user.country;
        user.additionalInfo = additionalInfo || user.additionalInfo;

        await user.save();

        // Return user without password
        const userReturn = user.toJSON();
        delete userReturn.password;

        res.json(userReturn);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Helper to get user trips for profile page sections
exports.getUserTrips = async (req, res) => {
    try {
        const trips = await Trip.findAll({ where: { userId: req.user.id } });
        // The frontend can filter these into Preplanned (Upcoming) and Previous (Completed)
        res.json(trips);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
