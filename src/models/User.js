const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    phone_number: DataTypes.STRING,
    role: DataTypes.ENUM("USER", "MASTER", "ADMIN"), // enum variantlarini o'zing belgilaysan
    lat: DataTypes.STRING,
    lon: DataTypes.STRING,
    image_id: DataTypes.BIGINT,
    experience: DataTypes.INTEGER,
    experience_type: DataTypes.ENUM('YEAR', 'MONTH'),
    is_premium: DataTypes.BOOLEAN,
    work_start: DataTypes.DATE,
    work_end: DataTypes.DATE,
    work_type: DataTypes.ENUM("FIVE_DAYS", "SIX_DAYS", "FULL"),
    region_id: DataTypes.BIGINT
}, {
    tableName: 'User',
    timestamps: false
});

module.exports = User;
