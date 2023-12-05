const user = require('../../models/userModels');
const jwt = require("jsonwebtoken");
const database = require('../../config/database');

class ProductsController {
    async male(req, res) {
        const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
        if (!user) {
            return res.render('Nam', {
                user: null
            })
        }
        // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
        if (user.role_id === 2)
            res.render('Nam', {
                user: user
            });
        else
            res.redirect('/admin/dashboard');
    }

    async female(req, res) {
        const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
        if (!user) {
            return res.render('Nu', {
                user: null
            })
        }
        // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
        if (user.role_id === 2)
            res.render('Nu', {
                user: user
            });
        else
            res.redirect('/admin/dashboard');
    }

    async baby(req, res) {
        const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
        if (!user) {
            return res.render('Tre_em', {
                user: null
            })
        }
        // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
        if (user.role_id === 2)
            res.render('Tre_em', {
                user: user
            });
        else
            res.redirect('/admin/dashboard');
    }
    async index(req, res) {
        const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
        if (!user) {
            return res.render('view_product', {
                user: null
            })
        }
        // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
        if (user.role_id === 2)
            res.render('view_product', {
                user: user
            });
        else 
            res.redirect('/admin/dashboard');
    }
    async showProductDetail(req, res) {
        try {
            const db = await database.connect();
            const roleId = 2;
            const idProduct = req.params.id;
            // const query = `
            //                 SELECT Products.id, title, price, thumbnail, description, type, name
            //                 FROM Products JOIN categories
            //                 ON  Products.category_id = categories.id 
            //                 WHERE Products.id = ?
            //             `;
            const query = `
            SELECT
            pd.id,
            pd.title,
            pd.price,
            pd.thumbnail,
            pd.description,
            pd.type,
            cat.name,
            COALESCE(SUM(od.quantity), 0) AS total_sold_quantity
            FROM
                Products pd
            JOIN
                Categories cat ON pd.category_id = cat.id
            LEFT JOIN
                Order_Details od ON od.product_id = pd.id
            WHERE pd.id = ?
            GROUP BY
                pd.id, pd.title, pd.price, pd.thumbnail, pd.description, pd.type, cat.name;
            `
            db.query(query, [idProduct], (error, results) => {
                if (error) {
                    console.log(error); 
                    return res.status(500).json({ message: "Internal server error" });
                }
                if (results.length) {
                    return res.status(200).json({ products: results });
                }
                else {
                    return res.status(404).json({ message: "User not found" });
                }
            })
            await database.disconnect(db);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async showProductSizes(req, res) {
        try {
            const db = await database.connect();
            const roleId = 2;
            const idProduct = req.params.id;
            const querySizes = `
                            SELECT *
                            FROM ProductSizes
                            WHERE product_id = ?
                        `;
            db.query(querySizes, [idProduct], (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Internal server error" });
                } 
                if (results.length) {
                    return res.status(200).json({ productSizes: results });
                }
                else {
                    return res.status(404).json({ message: "User not found" });
                }
            })
            await database.disconnect(db);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async addToCart(req, res) {
        const db = await database.connect();
     
        // Kiểm tra token và lấy thông tin người dùng
        const token = await req.cookies.token;
    
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    console.log(err);
                    // return res.status(500).json({ message: "Internal server error" }); 
                    return res.status(500).json({ message: "User not found" }); 
                }
    
                // Sử dụng thông tin người dùng để xác định ai đã thêm vào giỏ hàng
                const userId = user.id;
    
                const query = `
                    INSERT INTO Carts (user_id, product_id, quantity, size)
                    VALUES (?, ?, ?, ?)
                `;
    
                db.query(query, [userId, req.body.productId, req.body.quantity, req.body.size], (error, results) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ message: "Internal server error" });
                        // res.send('<script>window.history.back();</script>');  
                        // return res.send('<script>window.history.back();alert("Internal server error");</script>');   
                    }
    
                    if (results.affectedRows > 0) { 
                        // Thêm vào giỏ hàng thành công, không trả về message
                        return res.status(200).json({ message: "Thêm thành công" });  
                                            // Thêm vào giỏ hàng thành công
                        // Gửi thông báo thành công và quay lại trang trước đó 
                        // return res.status(200).json({ success: true });  

                        // Hiển thị thông báo
                        // res.send('<script>alert("Thêm vào giỏ hàng thành công");</script>');

                        // Quay lại trang trước đó  
                        // res.send('<script>window.history.back();</script>'); 
                        // return res.send('<script>window.history.back();alert("Thêm vào giỏ hàng thành công");</script>');
                        // res.send('<script>window.history.back();function notification() { alert("Hello, world!"); } setTimeout(notification, 100);</script>');
                        // return res.redirect('/cart');
                    } else { 
                        // return res.status(404).json({ message: "User not found" });
                        // return res.send('<script>window.history.back();alert("Chưa đăng nhập");</script>');
                    }   
                }); 
            }); 
        } else {
            return res.status(401).json({ message: "Invalid token" });
        }
        await database.disconnect(db);
    }
    
     
     
    async showSimilars(req, res) {
        try {
            const db = await database.connect();
            const roleId = 2;
            const idProduct = req.params.id;
            const query = `
                SELECT TB1.id, TB1.title, TB1.price, TB1.thumbnail
                FROM
                    (SELECT Products.id, title, price, thumbnail, type, category_id
                    FROM Products) AS TB1
                INNER JOIN
                    (SELECT * FROM products WHERE id = ?) AS TB2
                WHERE TB1.type = TB2.type AND TB1.category_id = TB2.category_id AND TB1.id != TB2.id
            `;
            db.query(query, [idProduct], (error, results) => { 
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Internal server error" });
                }
                if (results.length) {
                    return res.status(200).json({ products: results });
                }
                else {
                    return res.status(404).json({ message: "User not found" });
                }
            })
            await database.disconnect(db);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async showMaleShirts(req, res) {
        try {
            const db = await database.connect();
            const roleId = 2;
            const category = 1;
            const type = 'Áo';
            const query = `
                            SELECT id, title, price, thumbnail
                            FROM Products
                            WHERE type=? AND category_id = ?;            
                        `;
            db.query(query, [type, category], (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Internal server error" });
                }
                if (results.length) {
                    return res.status(200).json({ products: results });
                }
                else {
                    return res.status(404).json({ message: "User not found" });
                }
            })
            await database.disconnect(db);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async showMaleTrousers(req, res) {
        try {
            const db = await database.connect();
            const roleId = 2;
            const category = 1;
            const type = 'Quần';
            const query = `
                            SELECT id, title, price, thumbnail
                            FROM Products
                            WHERE type=? AND category_id = ?;            
                        `;
            db.query(query, [type, category], (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Internal server error" });
                }
                if (results.length) {
                    return res.status(200).json({ products: results });
                }
                else {
                    return res.status(404).json({ message: "User not found" });
                }
            })
            await database.disconnect(db);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async showFemaleShirts(req, res) {
        try {
            const db = await database.connect();
            const roleId = 2;
            const category = 2;
            const type = 'Áo';
            const query = `
                            SELECT id, title, price, thumbnail
                            FROM Products
                            WHERE type = ? AND category_id = ?;            
                        `;
            db.query(query, [type, category], (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Internal server error" });
                }
                if (results.length) {  
                    return res.status(200).json({ products: results });
                }
                else {
                    return res.status(404).json({ message: "User not found" });
                }
            })
            await database.disconnect(db);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async showFemaleTrousers(req, res) {
        try {
            const db = await database.connect();
            const roleId = 2;
            const category = 2;
            const type = 'Quần';
            const query = `
                            SELECT id, title, price, thumbnail
                            FROM Products
                            WHERE type = ? AND category_id = ?;            
                        `;
            db.query(query, [type, category], (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Internal server error" });
                }
                if (results.length) {  
                    return res.status(200).json({ products: results });
                }
                else {
                    return res.status(404).json({ message: "User not found" });
                }
            })
            await database.disconnect(db);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async showBabyShirts(req, res) {
        try {
            const db = await database.connect();
            const roleId = 2;
            const category = 3;
            const type = 'Áo';
            const query = `
                            SELECT id, title, price, thumbnail
                            FROM Products
                            WHERE type = ? AND category_id = ?;            
                        `;
            db.query(query, [type, category], (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Internal server error" });
                }
                if (results.length) {
                    return res.status(200).json({ products: results });
                }
                else {
                    return res.status(404).json({ message: "User not found" });
                }
            })
            await database.disconnect(db);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async showBabyTrousers(req, res) {
        try {
            const db = await database.connect();
            const roleId = 2;
            const category = 3;
            const type = 'Quần';
            const query = `
                            SELECT id, title, price, thumbnail
                            FROM Products
                            WHERE type = ? AND category_id = ?;            
                        `;
            db.query(query, [type, category], (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Internal server error" });
                }
                if (results.length) {
                    return res.status(200).json({ products: results });
                }
                else {
                    return res.status(404).json({ message: "User not found" });
                }
            })
            await database.disconnect(db);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
} 

module.exports = new ProductsController;
