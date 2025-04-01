import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../db/models/User'; // Correct path to the User model
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Validate the password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate a JWT
        const token = jwt.sign(
            { id: user.id, username: user.username }, 
            process.env.JWT_SECRET_KEY as string, 
            { expiresIn: '1h' } 
        );

        // Send the token to the client
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;