# 🛒 E-Commerce Microservices

This project implements a **microservices-based e-commerce system** with separate services for **Customer, Product, Order, Payment, and Payment Worker** functionalities.  

The services communicate via **REST APIs** (synchronous) and **RabbitMQ** (asynchronous for payment transactions), using **Node.js/Express.js**, **MongoDB**, and **Docker** for deployment.

---

## 📖 Project Overview

The system follows a **microservices architecture** where:

- **Customer Service** – Manages customer data (e.g., `customerId`, `name`, `email`).
- **Product Service** – Manages product data (e.g., `productId`, `name`, `price`, `stock`).
- **Order Service** – Handles order creation, validating customers/products, and initiating payments.
- **Payment Service** – Processes payments (simulated for demo) and publishes transaction details to a RabbitMQ queue.
- **Payment Worker** – Consumes transaction messages from RabbitMQ and saves them to MongoDB.

### 🔑 Key Features
- RESTful APIs for inter-service communication  
- Asynchronous transaction logging via RabbitMQ  
- MongoDB with **separate databases** for each service (`customer_db`, `product_db`, `order_db`, `payment_db`)  
- **Dockerized setup** with `docker-compose.yml` for local development  
- CommonJS (`require`) module system for compatibility with **Express 4.x**  

---

## 📂 Project Structure

ecommerce-microservices/
├── shared-services/
│ └── docker-compose.yml
├── customer-service/
│ ├── Dockerfile
│ ├── package.json
│ ├── index.js
│ ├── server.js
│ ├── seed.js
│ ├── models/Customer.js
│ ├── routes/customers.js
│ └── tests/customer.test.js
├── product-service/
│ ├── Dockerfile
│ ├── package.json
│ ├── index.js
│ ├── server.js
│ ├── seed.js
│ ├── models/Product.js
│ ├── routes/products.js
├── order-service/
│ ├── Dockerfile
│ ├── package.json
│ ├── index.js
│ ├── server.js
│ ├── models/Order.js
│ ├── routes/orders.js
│ ├── services/order.js
│ └── utils/apiClient.js
├── payment-service/
│ ├── Dockerfile
│ ├── package.json
│ ├── server.js
│ ├── models/Transaction.js
│ ├── routes/payments.js
│ └── utils/rabbitmq.js
├── README.md


---

## ⚙️ Prerequisites

- **Docker & Docker Compose** – Required to run services  
- **Node.js** – Version 18+ (used inside containers)  
- **MongoDB** – Managed via Docker (`mongo:6.0`)  
- **RabbitMQ** – Managed via Docker (`rabbitmq:3.12-management`)  

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone <repository-url>
cd ecommerce-microservices
```

2️⃣ Set Up Environment Variables

The docker-compose.yml already defines most environment variables. Key ones include:

MONGODB_URI → e.g. mongodb://admin:password123@mongodb:27017/customer_db?authSource=admin

RABBITMQ_URL → e.g. amqp://admin:password123@rabbitmq:5672

CUSTOMER_SERVICE_URL, PRODUCT_SERVICE_URL, PAYMENT_SERVICE_URL (used by Order Service)

PORT → Service-specific port (3001–3004)

3️⃣ Build and Run
```bash
docker-compose up --build

```
This starts:

MongoDB → mongodb:27017

RabbitMQ → rabbitmq:5672, Management UI → http://localhost:15672

(credentials: admin / password123)

Customer Service → http://localhost:3001

Product Service → http://localhost:3002

Order Service → http://localhost:3003

Payment Service → http://localhost:3004

Payment Worker → background worker (no HTTP endpoint)

4️⃣ Verify

Open RabbitMQ UI → http://localhost:15672

Connect to MongoDB → mongodb:27017 (admin/password123)

Verify seeded data in customer_db and product_db

📡 API Endpoints
👤 Customer Service (:3001)

GET /customers/:id → Fetch customer by ID

📦 Product Service (:3002)

GET /products/:id → Fetch product by ID

🛒 Order Service (:3003)

POST /orders → Create order ({ customerId, productId, amount })

💳 Payment Service (:3004)

POST /payments → Initiate payment (internal, called by Order Service)

🗂️ Seeded Data
Customers (customer_db)

cust1 → John Doe (john@example.com)

cust2 → Gabriel Doe (gab@example.com)

cust3 → John Mark (mark@example.com)

cust4 → Debby Alice (debby@example.com)

cust5 → Mark Angel (angel@example.com)

Products (product_db)

prod1 → Laptop, price: 1000, stock: 5

prod2 → Phone, price: 500, stock: 10

🔄 Architecture Flow

Client sends POST /orders → Order Service with { customerId, productId, amount }

Order Service:

Validates customer via Customer Service

Validates product via Product Service

Creates order in order_db (status: pending)

Calls Payment Service → POST /payments

Payment Service:

Simulates payment (always succeeds for demo)

Publishes transaction to RabbitMQ (transactions queue)

Returns { orderStatus: "paid" }

Order Service updates order status and returns response

Payment Worker consumes from RabbitMQ and persists transactions in payment_db
