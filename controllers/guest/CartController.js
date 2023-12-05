
const user = require('../../models/userModels');
const jwt = require("jsonwebtoken");
const database = require('../../config/database');

class CartController {
    index(req, res) {
        try {
            const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
            if (!user) {
                return res.redirect('/login');
            }

            // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
            if (user.role_id === 2) {
                return res.render('cart');
            } else {
                return res.redirect('/admin/dashboard');
            }
        } catch (err) {
            console.log(err);
            return res.redirect('/login');
        }
    }
    async showCart(req, res) {
        const db = await database.connect();
    
        // Kiểm tra token và lấy thông tin người dùng
        const token = await req.cookies.token;
    
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Internal server error" });
                }
    
                // Sử dụng thông tin người dùng để xác định ai đã thêm vào giỏ hàng
                const userId = user.id;
    
                const query = `
                    SELECT carts.user_id, carts.product_id, carts.size, carts.quantity, carts.created_at, products.title, products.price, products.thumbnail, productsizes.quantity AS instock_quantity
                    FROM carts INNER JOIN products INNER JOIN productsizes 
                    ON carts.product_id = productsizes.product_id AND carts.size = productsizes.size AND productsizes.product_id = products.id 
                    WHERE carts.user_id = 1
                    ORDER BY carts.created_at DESC;
                `;
    
                db.query(query, [userId], (error, results) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ message: "Internal server error" });
                    }
    
                    if (results.length > 0) {
                        return res.status(200).json({ products: results });  
                    } else {
                        return res.status(404).json({ message: "User not found" });
                    }
                }); 
            });
        } else {
            return res.status(401).json({ message: "Invalid token" });
        }
        await database.disconnect(db);
    }
}

module.exports = new CartController;
