const database = require('../config/database');

const OrderModel = {
    getOrders: async () => {
        const db = await database.connect();
        try {
            const query = `
                            SELECT * FROM orders
                        `;
            return new Promise((resolve, reject) => {
                db.query(query, [], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results.length) {
                        resolve(results);
                    } else {
                        resolve([]);
                    }
                });
            });
        } catch (error) {
            throw error;
        } finally {
            await database.disconnect(db);
        }
    },
}

module.exports = OrderModel;