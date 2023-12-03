const jwt = require('jsonwebtoken');
const database = require('../../config/database');
const upload = require('../../config/multer');


class ProductsController {
    index(req, res) {
        try {
            const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
            if (!user) {
                return res.redirect('/login');
            }

            // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
            if (user.role_id === 1)
                res.render('products');
            else
                res.redirect('/');
        } catch (err) {
            console.log(err);
            return res.redirect('/login');
        }
    }

    async getProducts(req, res) {
        try {
            const db = await database.connect();
            const query = `
                            SELECT products.*, name FROM products, categories WHERE products.category_id = categories.id
                        `;
            db.query(query, [], (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Internal server error" });
                }
                if (results.length) {
                    return res.status(200).json({ products: results });
                }
                else {
                    return res.status(404).json({ message: "Products not found" });
                }
            })
            await database.disconnect(db);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async addProduct(req, res) {
        const db = await database.connect()
        const product = req.body;

        const query = "INSERT INTO products SET ?";
        db.query(query, {})
    }
}

module.exports = new ProductsController;
