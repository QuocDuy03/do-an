const database = require('../../config/database');


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
                            SELECT products.*, name FROM products, categories WHERE products.category_id = categories.id ORDER BY products.id ASC
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
        const db = await database.connect();
        const { title, quantitySizeS, quantitySizeM, quantitySizeL, price, category, type, description } = req.body;
        const imageFile = req.file;
        const thumbnail = imageFile.path.replace('public\\', '')
        let category_id;
        if (category === "Nam")
            category_id = 1;
        else if (category === "Nữ")
            category_id = 2;
        else
            category_id = 3;

        const query1 = "INSERT INTO products SET ?";
        db.query(query1,
            { title: title, description: description, price: price, quantity: 0, thumbnail: thumbnail, category_id: category_id, type: type, },
            (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                const insertedId = result.insertId;
                
                const query2 = "INSERT INTO productsizes VALUES(?, ?, ?)";
                db.query(query2,[insertedId, 'S', quantitySizeS], (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    else {
                        console.log("Insert succesfully size S");
                    }
                })
                db.query(query2,[insertedId, 'M', quantitySizeM], (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    else {
                        console.log("Insert succesfully size M");
                    }
                })
                db.query(query2,[insertedId, 'L', quantitySizeL], (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    else {
                        console.log("Insert succesfully size L");
                    }
                })
                res.status(200).json({
                    message: "Thêm sản phẩm thành công"
                })
            }
        )
        

    }
}

module.exports = new ProductsController;
