const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// Add to inventory
router.post('/', async (req, res) => {
  try {
    const { product, stockQuantity, lowStockThreshold } = req.body;
    const inventory = new Inventory({ 
      product, 
      stock: stockQuantity // Map stockQuantity to stock field
    });
    await inventory.save();
    res.status(201).json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all inventory
router.get('/', async (req, res) => {
  try {
    const items = await Inventory.find().populate('product');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update stock quantity
router.put('/:id', async (req, res) => {
  try {
    const { stockQuantity } = req.body;
    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      { stock: stockQuantity }, // Map stockQuantity to stock field
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}); 

// Get inventory item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id).populate('product');
    if (!item) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete inventory item
router.delete('/:id', async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Inventory item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
