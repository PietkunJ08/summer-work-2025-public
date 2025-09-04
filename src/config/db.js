const { Pool } = require("pg");

const pool = new Pool({
  user: 'bean_and_brew_user',
  password: 'Podgorska73@',
  host: 'localhost',
  port: 5432,
  database: 'beanbrew',
});

pool.connect()
  .then(c => { console.log('PG connected to:', c.database); c.release(); })
  .catch(e => console.error('PG connect ERROR:', e));

module.exports = { query: (text, params) => pool.query(text, params) };

