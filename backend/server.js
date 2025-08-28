const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors({
  origin: "https://smart-stock-iota.vercel.app",
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('SmartStock API is running...');
});

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/sales', require('./routes/saleRoutes'));
app.use('/api/sales-reports', require('./routes/salesReportRoutes'));
app.use('/api/suppliers', require('./routes/supplierRoutes'));
app.use('/api/statistics', require('./routes/statisticsRoutes'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SmartStock backend running on port ${PORT}`);
});
