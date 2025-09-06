const db = require('../db');

exports.getMe = async (req, res) => {
    const { userId } = req.user;
    const result = await db.query(
      'SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = $1',
      [userId]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'User not found' });
    res.json({ user: result.rows[0] });
};
