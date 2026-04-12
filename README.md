# AgriChain

AgriChain is a centralized, database-driven platform designed to connect farmers, buyers, warehouses, and transport services in a single integrated system. It helps farmers list crops, buyers place orders, warehouses manage storage and spoilage, and transport operators handle deliveries efficiently.

## Project Structure
This project is divided into two parts:
* **Frontend**: React (Vite) application
* **Backend**: Node.js & Express.js application

## Database Schema (Proposed)

Given the requirements of connecting various stakeholders, the relational database is structured into the following key entities:

### 1. `Users`
Stores authentication and profile information for all stakeholders.
* `user_id` (Primary Key)
* `name`
* `email` / `phone`
* `password_hash`
* `role` (ENUM: 'Farmer', 'Buyer', 'Warehouse', 'Transport')
* `created_at`

### 2. `Crops` (Listings)
Crops listed by farmers available for purchase.
* `crop_id` (Primary Key)
* `farmer_id` (Foreign Key -> Users.user_id)
* `name` (e.g., Wheat, Rice)
* `quantity` (in kg/tons)
* `price_per_unit`
* `status` (ENUM: 'Available', 'Sold Out')

### 3. `Orders`
Transactions made by buyers purchasing crops.
* `order_id` (Primary Key)
* `buyer_id` (Foreign Key -> Users.user_id)
* `crop_id` (Foreign Key -> Crops.crop_id)
* `quantity`
* `total_price`
* `order_status` (ENUM: 'Pending', 'Confirmed', 'Completed')

### 4. `Warehouses`
Tracks storage facilities and their capacity.
* `warehouse_id` (Primary Key)
* `manager_id` (Foreign Key -> Users.user_id)
* `location`
* `total_capacity`
* `available_capacity`

### 5. `Deliveries`
Manages the transportation of crops from farmers/warehouses to buyers.
* `delivery_id` (Primary Key)
* `order_id` (Foreign Key -> Orders.order_id)
* `transport_id` (Foreign Key -> Users.user_id)
* `pickup_location`
* `dropoff_location`
* `delivery_status` (ENUM: 'Pending', 'In Transit', 'Delivered')

---

## Backend API Endpoints (Proposed)

The backend exposes a RESTful API powered by Express.js. Below are the anticipated endpoints for the application:

### Authentication Endpoints
| HTTP Method | Endpoint | Description |
| ----------- | -------- | ----------- |
| `POST` | `/api/auth/register` | Register a new user (Farmer, Buyer, etc.) |
| `POST` | `/api/auth/login` | Authenticate a user and return a JWT token |

### Crop Endpoints
| HTTP Method | Endpoint | Description |
| ----------- | -------- | ----------- |
| `GET` | `/api/crops` | Get all available crop listings |
| `POST` | `/api/crops` | List a new crop (Farmers only) |
| `GET` | `/api/crops/:id` | Get details of a specific crop |
| `PUT` | `/api/crops/:id` | Update crop details (price/quantity) |
| `DELETE` | `/api/crops/:id` | Remove a crop listing |

### Order Endpoints
| HTTP Method | Endpoint | Description |
| ----------- | -------- | ----------- |
| `GET` | `/api/orders` | View orders (Buyers see their purchases, Farmers see their sales) |
| `POST` | `/api/orders` | Place a new order for a crop (Buyers only) |
| `PUT` | `/api/orders/:id/status` | Update order status (e.g., Confirmed) |

### Warehouse Endpoints
| HTTP Method | Endpoint | Description |
| ----------- | -------- | ----------- |
| `GET` | `/api/warehouses` | List all available warehouses |
| `GET` | `/api/warehouses/:id/inventory`| View current inventory and capacity |
| `POST` | `/api/warehouses/:id/store` | Add crops to warehouse storage |

### Transport & Delivery Endpoints
| HTTP Method | Endpoint | Description |
| ----------- | -------- | ----------- |
| `GET` | `/api/deliveries` | List available delivery requests |
| `POST` | `/api/deliveries/accept` | Accept a delivery request (Transport only) |
| `PUT` | `/api/deliveries/:id/status` | Update delivery tracking status |

## Getting Started

### Prerequisites
* Node.js
* Any relational database server (e.g., MySQL or PostgreSQL)

### Running the Frontend
```bash
cd frontend
npm install
npm run dev
```

### Running the Backend
```bash
cd backend
npm install
npm run start
```
