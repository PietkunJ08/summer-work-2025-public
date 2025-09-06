const { Pool } = require("pg");

if (!process.env.DATABASE_URL) {
  console.error("❌ Missing DATABASE_URL env variable");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Render/Neon wymaga SSL
});

// test połączenia
pool.connect()
  .then(c => { console.log('✅ PG connected to:', c.database); c.release(); })
  .catch(e => console.error('❌ PG connect ERROR:', e));

module.exports = { query: (text, params) => pool.query(text, params) };
