import express from 'express';
import authenticateToken from '../middleware/auth';

const router = express.Router();

// Public route (no authentication required)
router.get('/public', (req, res) => {
    res.json({ message: 'This is a public route' });
});

// Protected route (authentication required)
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

export default router;