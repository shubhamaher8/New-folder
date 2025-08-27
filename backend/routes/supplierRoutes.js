const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

// Add a new supplier
router.post('/', async (req, res) => {
  try {
    const { name, contactInfo, productsSupplied } = req.body;
    const supplier = new Supplier({ name, contactInfo, productsSupplied });
    await supplier.save();
    res.status(201).json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find().populate('productsSupplied');
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a supplier
router.put('/:id', async (req, res) => {
  try {
    const { name, contactInfo, productsSupplied } = req.body;
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { name, contactInfo, productsSupplied },
      { new: true, runValidators: true }
    ).populate('productsSupplied');
    
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a supplier
router.delete('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json({ message: 'Supplier deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
