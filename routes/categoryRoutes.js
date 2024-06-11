// routes/categoryRoutes.js
const express = require('express');
const { createCategory, getCategories, updateCategory, deleteCategory,getCategory } = require('../controllers/categoryController');
const router = express.Router();

router.post('/', createCategory);
router.get('/', getCategories);
router.get('/:id', getCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);


module.exports = router;
