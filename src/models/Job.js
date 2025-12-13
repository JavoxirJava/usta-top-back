const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User'); // user model import qilinadi

const Job = sequelize.define('Job', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  status: { 
    type: DataTypes.ENUM('active', 'completed', 'cancelled'), 
    defaultValue: 'active' 
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  masterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'jobs',
  updatedAt: false
});

// Associations
Job.belongsTo(User, { as: 'client', foreignKey: 'clientId' });
Job.belongsTo(User, { as: 'master', foreignKey: 'masterId' });

module.exports = Job;
