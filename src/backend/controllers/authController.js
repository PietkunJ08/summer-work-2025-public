const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password)
      return res.status(400).json({ error: "Name, email, password required" });

    // czy email już istnieje
    const exists = await db.query("SELECT 1 FROM users WHERE email=$1", [email]);
    if (exists.rowCount) return res.status(409).json({ error: "Email already in use" });

    const hash = await bcrypt.hash(password, 10);
    const result = await db.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1,$2,$3)
       RETURNING id, name, email, role, created_at`,
      [name, email, hash]
    );

    res.status(201).json({ user: result.rows[0], message: "Your account has been created 🎉" });
  } catch (e) {
    // Najważniejsze: zobacz to w terminalu
    console.error("REGISTER ERROR:", e);

    // Mapowanie typowych błędów PG:
    if (e.code === "23505") { // unique_violation
      return res.status(409).json({ error: "Email already in use" });
    }
    if (e.code === "42883" || e.message?.includes("uuid_generate_v4")) {
      return res.status(500).json({ error: 'Missing extension "uuid-ossp" in database' });
    }
    if (e.code === "42704" || e.message?.toLowerCase().includes("citext")) {
      return res.status(500).json({ error: 'Missing extension "citext" in database' });
    }
    if (e.message?.includes('relation "users" does not exist')) {
      return res.status(500).json({ error: 'Table "users" not found. Run schema.sql in your DB.' });
    }

    res.status(500).json({ error: "Registration failed" });
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const { rows } = await db.query("SELECT * FROM users WHERE email=$1", [email]);
    if (!rows.length) return res.status(401).json({ error: "Invalid email or password" });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (e) {
    res.status(500).json({ error: "Login failed", details: e.message });
  }
};
