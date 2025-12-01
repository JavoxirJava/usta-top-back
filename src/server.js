const app = require('./app');
const { sequelize } = require('./config/db');

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
    .then(() => {
        console.log('DB connected');
        return sequelize.sync(); // hozircha simple, keyin migration qilsa ham bo'ladi
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(console.error);
