const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Comment = sequelize.define('Comment', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    comment: DataTypes.TEXT,
    level: DataTypes.BLOB, // diagramda bytea, agar rating bo'lsa int/float qilsang ham bo'ladi
    portfolio_id: { type: DataTypes.BIGINT, allowNull: false },
    sendir_email: DataTypes.STRING,
    sendir_name: DataTypes.STRING
}, {
    tableName: 'comments',
    timestamps: false
});

module.exports = Comment;
