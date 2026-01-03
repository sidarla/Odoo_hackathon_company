const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ItineraryItem = sequelize.define('ItineraryItem', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING, // e.g., 'travel', 'hotel', 'activity'
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        startDate: {
            type: DataTypes.DATE // Can include time
        },
        endDate: {
            type: DataTypes.DATE
        },
        budget: {
            type: DataTypes.FLOAT
        },
        location: {
            type: DataTypes.STRING
        }
    });

    return ItineraryItem;
};
