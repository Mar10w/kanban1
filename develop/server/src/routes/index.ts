import express from 'express';
import authenticateToken from '../middleware/auth';
import authRoutes from './auth-routes';

const router = express.Router();

// Public route
router.get('/public', (req, res) => {
    res.json({ message: 'This is a public route' });
});

// Protected route
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});
router.use('/auth', authRoutes);

export default router;