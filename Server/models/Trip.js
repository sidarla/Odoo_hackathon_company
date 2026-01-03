const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Trip = sequelize.define('Trip', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATEONLY
        },
        endDate: {
            type: DataTypes.DATEONLY
        },
        place: {
            type: DataTypes.STRING
        },
        coverPhoto: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.ENUM('ongoing', 'upcoming', 'completed'),
            defaultValue: 'upcoming'
        }
    });

    return Trip;
};
