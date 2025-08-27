// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Create product
router.post('/', async (req, res) => {
  try {
    const { 
      name, 
      sku, 
      price, 
      quantityInStock, 
      description, 
      category, 
      ratings,
      isDefective,
      defectiveNotes 
    } = req.body;

    const product = new Product({ 
      name, 
      sku, 
      price, 
      quantityInStock, 
      description, 
      category,
      isDefective: isDefective || false,
      defectiveNotes: defectiveNotes || '',
      ratings: ratings || [],
      averageRating: ratings && ratings.length > 0 
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length 
        : 0,
      totalRatings: ratings ? ratings.length : 0
    });
    
    await product.save();
    res.status(201).json({ message: 'Product added', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    // If only updating defective status, handle that specifically
    if (Object.keys(req.body).every(key => ['isDefective', 'defectiveNotes'].includes(key))) {
      const { isDefective, defectiveNotes } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { 
          $set: { 
            isDefective: isDefective || false,
            defectiveNotes: defectiveNotes || ''
          } 
        },
        { new: true }
      );
      return res.json(updatedProduct);
    }

    // Otherwise handle full product update
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a rating to a product
router.post('/:id/ratings', async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Add new rating
    product.ratings.push({ rating, comment });

    // Update average rating and total ratings
    const totalRating = product.ratings.reduce((sum, r) => sum + r.rating, 0);
    product.totalRatings = product.ratings.length;
    product.averageRating = totalRating / product.totalRatings;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all ratings for a product
router.get('/:id/ratings', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
        res.json({
          ratings: product.ratings,
          averageRating: product.averageRating,
          totalRatings: product.totalRatings
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

module.exports = router;