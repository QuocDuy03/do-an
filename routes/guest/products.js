const express = require('express');
const router = express.Router();

const productsController = require("../../controllers/guest/ProductsController");

// router.get('/', productsController.index)
router.get('/details/:id', productsController.index)
// router.get('/:id', productsController.showProductDetail)
// router.get('/showProduct', productsController.showProduct)
router.get('/details/:id/showProductDetail', productsController.showProductDetail)
router.get('/details/:id/showProductSizes', productsController.showProductSizes)
router.post('/addToCart', productsController.addToCart)
router.get('/details/:id/showSimilars', productsController.showSimilars)
router.get('/male', productsController.male)  
router.get('/showMaleShirts', productsController.showMaleShirts)
router.get('/showMaleTrousers', productsController.showMaleTrousers)
router.get('/female', productsController.female)
router.get('/showFemaleShirts', productsController.showFemaleShirts)   
router.get('/showFemaleTrousers', productsController.showFemaleTrousers)   
router.get('/baby', productsController.baby)
router.get('/showBabyShirts', productsController.showBabyShirts)
router.get('/showBabyTrousers', productsController.showBabyTrousers)
 
module.exports = router;     