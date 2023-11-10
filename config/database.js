const mysql = require('mysql');

async function connect() {
    try {
        await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: null,
            database: 'selling_clothes',
        })
        console.log('connect successfully');
    } catch (error) {
        console.log('connect failure');
    }
}

module.exports = { connect }