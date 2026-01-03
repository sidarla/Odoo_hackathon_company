const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'),
    logging: false
});

const User = require('./User')(sequelize);
const Trip = require('./Trip')(sequelize);
const ItineraryItem = require('./ItineraryItem')(sequelize);

// Associations
User.hasMany(Trip, { foreignKey: 'userId' });
Trip.belongsTo(User, { foreignKey: 'userId' });

Trip.hasMany(ItineraryItem, { foreignKey: 'tripId' });
ItineraryItem.belongsTo(Trip, { foreignKey: 'tripId' });

module.exports = {
    sequelize,
    User,
    Trip,
    ItineraryItem
};
