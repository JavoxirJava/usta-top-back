const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PortfolioImage = sequelize.define('PortfolioImage', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    portfolio_id: { type: DataTypes.BIGINT, allowNull: false },
    image_id: { type: DataTypes.BIGINT, allowNull: false }
}, {
    tableName: 'portfolio_images',
    timestamps: false
});

module.exports = PortfolioImage;
