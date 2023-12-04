const jwt = require('jsonwebtoken');
const database = require('../../config/database');
const bcrypt = require('bcryptjs');
const UserModel = require('../../models/userModels');
const ProductModel = require('../../models/productModels');

class DashboardController {
    index(req, res) {
        try {
            const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
            if (!user) {
                return res.redirect('/login');
            }
            // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
            if (user.role_id === 1)
                res.render('dashboard');
            else
                res.redirect('/');
        } catch (err) {
            console.log(err);
            return res.redirect('/login');
        }
    }

    profile(req, res) {
        try {
            const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
            if (!user) {
                return res.redirect('/login');
            }
            // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
            if (user.role_id === 1)
                res.render('profile');
            else
                res.redirect('/');
        } catch (err) {
            console.log(err);
            return res.redirect('/login');
        }
    }

    async getProfile(req, res) {
        try {
            const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
            if (!user) {
                return res.redirect('/login');
            }
            const userInfo = await UserModel.getUserById(user.id);

            return res.status(200).json({
                id: user.id,
                name: userInfo.fullname,
                email: userInfo.email,
                phone: userInfo.phone_number,
                address: userInfo.address,
            });
        } catch (err) {
            console.log(err);
            return res.redirect('/login');
        }
    }

    async countCustomers(req, res) {
        try {
            const quantity = await UserModel.countCustomers();
            return res.status(200).json({ quantity });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async countEmployees(req, res) {
        try {
            const quantity = await UserModel.countEmployees();
            return res.status(200).json({ quantity });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async countProducts(req, res) {
        try {
            const quantity = await ProductModel.countProducts();
            return res.status(200).json({ quantity });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async changePassword(req, res) {
        const db = await database.connect();
        const formData = req.body;

        const query = "SELECT * FROM users WHERE id = ?";

        db.query(query, [formData.id], async (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Internal server error" });
            }

            const user = results[0];

            let isValidPassword = await bcrypt.compare(formData.oldPassword, user.password);
            if (!isValidPassword) {
                return res.status(401).json({
                    message: "Mật khẩu cũ không đúng",
                })
            }

            if (formData.newPassword !== formData.confirmNewPassword) {
                return res.status(401).json({
                    message: "Mật khẩu không khớp",
                })
            }

            let hashedPass = await bcrypt.hash(formData.newPassword, 8);

            db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPass, formData.id], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else
                    res.status(200).json({ message: "Thay đổi mật khẩu thành công" })
            })
        });
        await database.disconnect(db);
    }
}

module.exports = new DashboardController;
