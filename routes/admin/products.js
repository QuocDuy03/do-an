const express = require('express');
const router = express.Router();
const upload = require('../../config/multer');

const productsController = require("../../controllers/admin/ProductsController");

router.get('/', productsController.index)
router.get('/getProducts', productsController.getProducts)
router.post('/addProduct', upload.single('imageFile'), productsController.addProduct)

module.exports = router;