const router = require('express').Router();
const authenticateToken = require('../middleware/authMiddleware');
const { getMe } = require('../controllers/userController');

router.get('/me', authenticateToken, getMe);

module.exports = router;
