const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, phone, city, country, additionalInfo } = req.body;

        // Check if user exists
        let user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = await User.create({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
            city,
            country,
            additionalInfo
        });

        // Create token
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '5d' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body; // Mockup showed Username/Password login

        // Check if user exists (by username or email? Mockup said Username)
        let user = await User.findOne({ where: { username } });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        // Create token
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '5d' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
