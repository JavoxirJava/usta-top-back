const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Region = sequelize.define('Region', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'regions',
    timestamps: false
});

module.exports = Region;
