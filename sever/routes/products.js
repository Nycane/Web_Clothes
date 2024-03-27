const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
router.get('/search',productController.getSearchProduct);
router.get('/size',productController.getProductSizes);
router.get('/color',productController.getProductColors);
router.get('/brand',productController.getProductBrands);
router.get('/category',productController.getProductCategories);
router.get('/filter',productController.filterProducts);
router.get('/best-seller',productController.getBestSellerProducts);
router.get('/trending',productController.getTrendingProducts);
router.get('/look-book',productController.getLookBooks);
router.get('/related/:id',productController.getRelatedProducts);
router.get('/size/brand/:name',productController.getProductSizeByBrand);
router.get('/size/category/:name',productController.getProductSizeByCategory);
router.get('/color/brand/:name',productController.getProductColorByBrand);
router.get('/color/category/:name',productController.getProductColorByCategory);
router.get('/variant/:id',productController.getProductById);
router.get('/image/:id',productController.getProductImageById);
router.get('/',productController.getProducts);
router.post('/price',productController.getProductPrice);

module.exports = router