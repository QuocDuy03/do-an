// models/userModel.js

const database = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = {
    getUserByEmail: async (email) => {
        const db = await database.connect();
        try {
            const query = "SELECT * FROM users WHERE email = ?";
            const results = await new Promise((resolve, reject) => {
                db.query(query, [email], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
            return results[0];
        } catch (error) {
            throw error;
        } finally {
            await database.disconnect(db);
        }
    },

    generateToken: (userData) => {
        return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 86400 });
    },

    comparePassword: async (password, hash) => {
        return await bcrypt.compare(password, hash);
    },

    getEmployees: async () => {
        const db = await database.connect();
        try {
            const roleId = 1;
            const query = `
                            SELECT users.id, fullname, email, phone_number, address, name
                            FROM users
                            INNER JOIN roles ON users.role_id = roles.id
                            WHERE role_id = ?
                        `;
            return new Promise((resolve, reject) => {
                db.query(query, [roleId], (error, results) => {
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

    getCustomers: async () => {
        const db = await database.connect();
        try {
            const roleId = 2;
            const query = `
                            SELECT users.id, fullname, email, phone_number, address, name
                            FROM users
                            INNER JOIN roles ON users.role_id = roles.id
                            WHERE role_id = ?
                        `;
            return new Promise((resolve, reject) => {
                db.query(query, [roleId], (error, results) => {
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

    countCustomers: async () => {
        const db = await database.connect();
        try {
            const roleId = 2;
            const query = `
                            SELECT COUNT(*) AS quantityCustomers
                            FROM users
                            WHERE role_id = ?
                        `;
            const results = await new Promise((resolve, reject) => {
                db.query(query, [roleId], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
            return results[0].quantityCustomers;
        } catch (error) {
            throw error;
        } finally {
            await database.disconnect(db);
        }
    },

    countEmployees: async () => {
        const db = await database.connect();
        try {
            const roleId = 1;
            const query = `
                            SELECT COUNT(*) AS quantityEmployees
                            FROM users
                            WHERE role_id = ?
                        `;
            const results = await new Promise((resolve, reject) => {
                db.query(query, [roleId], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
            return results[0].quantityEmployees;
        } catch (error) {
            throw error;
        } finally {
            await database.disconnect(db);
        }
    },

    getUserById: async (userId) => {
        const db = await database.connect();
        try {
            const query = "SELECT * FROM users WHERE id = ?";
            const results = await new Promise((resolve, reject) => {
                db.query(query, [userId], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
            return results[0];
        } catch (err) {
            throw err;
        } finally {
            await database.disconnect(db);
        }
    },
};

module.exports = UserModel;
