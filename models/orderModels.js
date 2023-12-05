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

    getOrderDetails: async (userId) => {
        const db = await database.connect();
        try {
            const query = `
                            SELECT order_details.*, products.title, products.thumbnail
                            FROM order_details, orders, products 
                            WHERE order_details.order_id = orders.id 
                                AND order_details.product_id = products.id
                                AND orders.user_id = ?
                                AND orders.status != 'Đã giao'
                        `;
            return new Promise((resolve, reject) => {
                db.query(query, [userId], (error, results) => {
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

    getOrderHistory: async (userId) => {
        const db = await database.connect();
        try {
            const query = `
                            SELECT order_details.*, products.title, products.thumbnail
                            FROM order_details, orders, products 
                            WHERE order_details.order_id = orders.id 
                                AND order_details.product_id = products.id
                                AND orders.user_id = ?
                                AND orders.status = 'Đã giao'
                        `;
            return new Promise((resolve, reject) => {
                db.query(query, [userId], (error, results) => {
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

    updateOrderStatus: async (orderId, status) => {
        const db = await database.connect();
        try {
            const query = `
                UPDATE orders SET status = ? WHERE id = ?
            `;
            return new Promise((resolve, reject) => {
                db.query(query, [status, orderId], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
        } catch (error) {
            throw error;
        } finally {
            await database.disconnect(db);
        }
    }
}

module.exports = OrderModel;