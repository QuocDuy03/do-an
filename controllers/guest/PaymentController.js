

const user = require('../../models/userModels');
const jwt = require("jsonwebtoken");
const database = require('../../config/database');

class PaymentController {
    index(req, res) {
        try {
            const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
            if (!user) {
                return res.redirect('/login');
            }

            // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
            if (user.role_id === 2)
                res.render('payment');
            else
                res.redirect('/admin/dashboard');
        } catch (err) {
            console.log(err);
            return res.redirect('/login');
        }
    }
    async thanhToan(req, res) {
        const db = await database.connect();
     
        // Kiểm tra token và lấy thông tin người dùng
        const token = await req.cookies.token;

        const orderInfo = req.body;
        console.log('thông tin đã gửi lên',orderInfo.length);
    
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "User not found" }); 
                }
    
                // Sử dụng thông tin người dùng để xác định ai đã thêm vào giỏ hàng
                const userId = user.id;
                const status = "Đang giao";
                
                const newOrder = `
                    INSERT INTO Orders (user_id, fullname, email, phone_number, address, note, status, total_money)
                    VALUES (?,?,?,?,?,?,?,?);                
                `;
                db.query(newOrder, [userId, orderInfo[0].ho_ten, orderInfo[0].email_user, orderInfo[0].sdt, orderInfo[0].dia_chi, orderInfo[0].ghi_chu, status, orderInfo[0].tong_tien ], (error, results) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ message: "Internal server error" }); 
                    }
    
                    if (results.affectedRows > 0) { 
                        const orderId = results.insertId; // Lấy ID của đơn hàng mới
                        const newDetail = `
                            INSERT INTO Order_Details (order_id, product_id, size, price, quantity, total_money) 
                            VALUES (?,?,?,?,?,?)   
                        `;
                        const deleteCart = `
                            DELETE FROM Carts
                            WHERE user_id = ?
                            AND product_id = ?
                            AND size = ?; 
                        `;
                        for(let i = 1; i<orderInfo.length;i++){
                            db.query(newDetail,[orderId, orderInfo[i].product_id, orderInfo[i].size, orderInfo[i].price, orderInfo[i].quantity, orderInfo[i].total_money],(error, results) => {
                                if (error) {
                                    console.log(error);  
                                    return res.status(500).json({ message: "Internal server error" }); 
                                }
                
                                // if (results.affectedRows > 0) { 
                                //     // const orderId = results.insertId; // Lấy ID của đơn hàng mới
                                //     // const newDetail = `
                                //     //     INSERT INTO Order_Details (order_id, product_id, price, quantity, total_money) 
                                //     //     VALUES (?,?,?,?,?)
                                //     // `;
                                //     // for(i = 1; i<orderInfo.length;i++){
                                //     //     db.query(newDetail,[orderId, orderInfo[i].product_id, orderInfo[i].price, orderInfo[i].quantity, orderInfo[i].total_money],)
                                //     // }
                                //     // return res.status(200).json({ message: "Thêm thành công" });  
                                // } else { 
                                //     return res.status(404).json({ message: "User not found" });
                                // }   
                            });
                            //Xóa sản phẩm trong cart sau dòng này
                            db.query(deleteCart,[userId, orderInfo[i].product_id, orderInfo[i].size],(error, results) => {
                                if (error) {
                                    console.log(error);  
                                    return res.status(500).json({ message: "Internal server error" }); 
                                }
                
                                if (results.affectedRows > 0) { 
                                    // const orderId = results.insertId; // Lấy ID của đơn hàng mới
                                    // const newDetail = `
                                    //     INSERT INTO Order_Details (order_id, product_id, price, quantity, total_money) 
                                    //     VALUES (?,?,?,?,?)
                                    // `;
                                    // for(i = 1; i<orderInfo.length;i++){
                                    //     db.query(newDetail,[orderId, orderInfo[i].product_id, orderInfo[i].price, orderInfo[i].quantity, orderInfo[i].total_money],)
                                    // }
                                    // return res.status(200).json({ message: "Thêm thành công" });  
                                } else { 
                                    return res.status(404).json({ message: "User not found" });
                                }   
                            });
                        }
                        return res.status(200).json({ message: "Thêm thành công" });  
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

module.exports = new PaymentController;
