const { Pool } = require('pg');

const dotenv = require('dotenv');

dotenv.config();

const connectionString = process.env.DB_URL;

const pool = new Pool({
  connectionString,
});

pool.on('connect', () => {
  console.log('connected to the PSQL Database');
});

module.exports = pool;
