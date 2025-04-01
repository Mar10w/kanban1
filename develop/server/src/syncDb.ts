import sequelize from './db';
import User from './models/User.ts';

const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        // Sync all models
        await sequelize.sync({ force: false }); // Set force to true to drop and recreate tables
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

syncDatabase();