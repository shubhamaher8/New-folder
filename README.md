# SmartStock

**Live Demo:** [https://smart-stock-iota.vercel.app/](https://smart-stock-iota.vercel.app/)

## Overview

SmartStock is an enterprise inventory management system designed to streamline product, order, sales, and supplier management for businesses. It features a modern dashboard, real-time statistics, and comprehensive CRUD operations for all inventory entities.

## Features

- **Dashboard:** Visual overview of products, orders, sales, and inventory status.
- **Product Management:** Add, edit, view, and rate products. Track defective items and stock levels.
- **Order Management:** Create and manage purchase orders, track order status.
- **Sales Tracking:** Record sales transactions and monitor monthly/quarterly revenue.
- **Supplier Management:** Manage supplier details and their supplied products.
- **Sales Reports:** Generate and preview sales reports for custom periods.
- **Statistics:** View best-selling products, low stock alerts, and more.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Backend:** Node.js, Express.js, MongoDB (via Mongoose)
- **Other:** dotenv, cors, nodemon
- **Deployment:** Vercel (Frontend), Node.js server (Backend)

## Project Structure

```
backend/
	server.js
	package.json
	config/
	models/
	routes/
frontend/
	index.html
	products.html
	inventory.html
	orders.html
	sales.html
	suppliers.html
	sales-reports.html
	assets/
```

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB instance (local or cloud)

### Backend Setup

1. `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file with your MongoDB URI:
	 ```
	 MONGODB_URI=your_mongodb_connection_string
	 ```
4. Start the server:
	 - Development: `npm run dev`
	 - Production: `npm start`

### Frontend

- The frontend is static and can be served via any static server or deployed (e.g., Vercel).

### API Endpoints

- `/api/products`
- `/api/inventory`
- `/api/orders`
- `/api/sales`
- `/api/sales-reports`
- `/api/suppliers`
- `/api/statistics`

## Deployment

- The frontend is deployed at: [https://smart-stock-iota.vercel.app/](https://smart-stock-iota.vercel.app/)
- Backend should be deployed separately (e.g., on Render, Heroku, or your own server).

## License

ISC
