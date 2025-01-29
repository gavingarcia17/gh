const router = require('express').Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../../controllers/product-controller');

// GET all products
router.get('/', getAllProducts);

// GET a single product by ID
router.get('/:id', getProductById);

// POST a new product
router.post('/', createProduct);

// PUT update a product by ID
router.put('/:id', updateProduct);

// DELETE a product by ID
router.delete('/:id', deleteProduct);

module.exports = router;