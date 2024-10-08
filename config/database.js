const { Pool } = require('pg');

// Configuração da conexão com o banco PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hospital_db',
  password: 'root',
  port: 5432, // Porta padrão do PostgreSQL
});

module.exports = pool;
