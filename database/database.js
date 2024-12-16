const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '<your-root-password>',
    database: 'hospital'
});

module.exports = pool.promise();
