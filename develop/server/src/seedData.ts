import sequelize from '../db/db';
import User from '../db/models/User';

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); 
        console.log('Database synced.');

        // Create a test user
        await User.create({
            username: 'testuser',
            password: 'password123', 
        });

        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

seedDatabase();