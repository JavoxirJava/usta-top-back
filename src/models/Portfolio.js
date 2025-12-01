const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Portfolio = sequelize.define('Portfolio', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    user_id: { type: DataTypes.BIGINT, allowNull: false }
}, {
    tableName: 'portfolios',
    timestamps: false
});

module.exports = Portfolio;
