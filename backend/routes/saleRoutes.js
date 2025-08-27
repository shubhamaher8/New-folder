const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

// Create a sale
router.post('/', async (req, res) => {
  try {
    const { product, quantitySold, totalRevenue } = req.body;
    const sale = new Sale({ 
      product, 
      quantitySold, 
      totalRevenue,
      saleDate: new Date() 
    });
    await sale.save();
    const populatedSale = await Sale.findById(sale._id).populate('product');
    res.status(201).json(populatedSale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all sales
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate('product')
      .sort({ saleDate: -1 }); // Sort by newest first
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get sales by date range
router.get('/range', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};
    
    if (startDate && endDate) {
      query.saleDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    const sales = await Sale.find(query)
      .populate('product')
      .sort({ saleDate: -1 });
    
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
