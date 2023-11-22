const database = require('../config/database');

class UserModel {

    async getAllUsers() {
        const connection = await database.connect();

        const query = 'SELECT * FROM user';

        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
                connection.release();
            });
        });
    }
}

module.exports = new UserModel;