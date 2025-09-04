// src/backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function authenticateToken(req, res, next) {
  const auth = req.headers['authorization'] || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;

  if (!token) return res.status(401).json({ error: 'No token provided' });

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET is missing');
    return res.status(500).json({ error: 'Server misconfiguration (JWT secret missing)' });
  }

  try {
    const payload = jwt.verify(token, secret);
    // spodziewamy się { userId, role }
    req.user = { userId: payload.userId, role: payload.role };
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
