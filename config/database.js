const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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

function disconnect(connection) {
    return new Promise((resolve, reject) => {
        if (!connection) {
            reject(new Error('Connection not provided'));
        } else {
            connection.release(); // Release the connection back to the pool
            console.log('Disconnected from MySQL database');
            resolve();
        }
    });
}

module.exports = { connect, disconnect };
