const database = require('../config/database');

const ProductModel = {
    countProducts: async () => {
        const db = await database.connect();
        try {
            const query = `
                            SELECT COUNT(*) AS quantityProducts
                            FROM products
                        `;
            const results = await new Promise((resolve, reject) => {
                db.query(query, [], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
            return results[0].quantityProducts;
        } catch (error) {
            throw error;
        } finally {
            await database.disconnect(db);
        }
    },
    getProducts: async () => {
        const db = await database.connect();
        try {
            const query = `
                            SELECT products.*, name FROM products, categories WHERE products.category_id = categories.id ORDER BY products.id ASC
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

module.exports = ProductModel;