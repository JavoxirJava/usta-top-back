const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const UserInfo = sequelize.define('UserInfo', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    category_id: { type: DataTypes.BIGINT, allowNull: false },
    price: { type: DataTypes.BIGINT, allowNull: true }
}, {
    tableName: 'user_infos',
    timestamps: false
});

module.exports = UserInfo;
