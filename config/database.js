const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'selling_clothes',
});

function connect() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                console.log('Connected to MySQL database');
                resolve(connection);
            }
        });
    });
}

module.exports = { connect };
