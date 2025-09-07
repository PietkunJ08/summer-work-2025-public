const router = require("express").Router();
const db = require("../db");
const requireAuth = require("../middleware/requireAuth");

router.get("/me", requireAuth, async (req, res) => {
  const { userId } = req.user;
  const q = `
    SELECT id, name, email, role, created_at, updated_at
    FROM users
    WHERE id = $1
  `;
  const { rows } = await db.query(q, [userId]);
  if (!rows.length) return res.status(404).json({ error: "user_not_found" });
  res.json({ user: rows[0] });
});

module.exports = router;
