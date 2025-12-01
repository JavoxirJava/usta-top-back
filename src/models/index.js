const User = require('./User');
const Region = require('./Region');
const Category = require('./Category');
const UserInfo = require('./UserInfo');
const Portfolio = require('./Portfolio.js');
const PortfolioImage = require('./PortfolioImage');
const Comment = require('./Comment');

// relations
Region.hasMany(User, { foreignKey: 'region_id' });
User.belongsTo(Region, { foreignKey: 'region_id' });

User.belongsToMany(Category, { through: UserInfo, foreignKey: 'user_id' });
Category.belongsToMany(User, { through: UserInfo, foreignKey: 'category_id' });

User.hasMany(Portfolio, { foreignKey: 'user_id' });
Portfolio.belongsTo(User, { foreignKey: 'user_id' });

Portfolio.hasMany(PortfolioImage, { foreignKey: 'portfolio_id' });
PortfolioImage.belongsTo(Portfolio, { foreignKey: 'portfolio_id' });

Portfolio.hasMany(Comment, { foreignKey: 'portfolio_id' });
Comment.belongsTo(Portfolio, { foreignKey: 'portfolio_id' });

module.exports = {
    User,
    Region,
    Category,
    UserInfo,
    Portfolio,
    PortfolioImage,
    Comment
};
