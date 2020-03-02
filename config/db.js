const { createConnection } = require('mysql2');

const connection = createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '55610096',
  database: 'employees_db'
});

module.exports = connection;