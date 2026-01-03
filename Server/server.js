const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/trips', require('./routes/tripRoutes'));
app.use('/api/trips', require('./routes/tripRoutes'));
app.use('/api/trips/:tripId/items', require('./routes/itineraryRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Database Sync and Server Start
sequelize.sync({ force: false }) // force: false ensures we don't drop tables on restart
    .then(() => {
        console.log('Database synced...');
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    })
    .catch(err => console.log('Error: ' + err));
