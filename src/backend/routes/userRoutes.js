// src/backend/routes/userRoutes.js
const router = require('express').Router();
const db = require('../db');
const auth = require('../middleware/authMiddleware');

router.get('/me', auth, async (req, res) => {
  const { userId } = req.user;
  const { rows } = await db.query(
    'SELECT id, name, email, role, created_at, updated_at FROM users WHERE id=$1',
    [userId]
  );
  if (!rows.length) return res.status(404).json({ error: 'User not found' });
  res.json({ user: rows[0] });
});

module.exports = router;
