const app = require('./app');
const { sequelize } = require('./config/db');
const ctrl = require('./controllers/auth.controller');

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
    .then(() => {
        console.log('DB connected');
        // keeps dev schema aligned with model changes without manual migrations
        return sequelize.sync({ alter: true });
    })
    .then(() => ctrl.init())
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(console.error);
