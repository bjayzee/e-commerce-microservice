E-Commerce Microservices
This project implements a microservices-based e-commerce system with separate services for Customer, Product, Order, Payment, and Payment Worker functionalities. The services communicate via REST APIs (synchronous) and RabbitMQ (asynchronous for payment transactions), using Node.js/Express.js, MongoDB, and Docker for deployment.
Project Overview
The system follows a microservices architecture where:

Customer Service: Manages customer data (e.g., customerId, name, email).
Product Service: Manages product data (e.g., productId, name, price, stock).
Order Service: Handles order creation, validating customers and products, and initiating payments.
Payment Service: Processes payments (simulated for demo) and publishes transaction details to a RabbitMQ queue.
Payment Worker: Consumes transaction messages from RabbitMQ and saves them to MongoDB.

Key features:

RESTful APIs for inter-service communication.
Asynchronous transaction logging via RabbitMQ.
MongoDB with separate databases for each service (customer_db, product_db, order_db, payment_db).
Dockerized setup with docker-compose.yml for local development.
CommonJS (require) module system for compatibility with Express 4.x.

Project Structure
ecommerce-microservices/
├── shared-services/
|   ├── docker-compose.yml
├── customer-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js
│   ├── server.js
│   ├── seed.js
│   ├── models/
│   │   └── Customer.js
│   ├── routes/
│   │   └── customers.js
│   ├── __tests__/
│   │   └── customer.test.js
├── product-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js
│   ├── server.js
│   ├── seed.js
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── products.js
├── order-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js
│   ├── server.js
│   ├── models/
│   │   └── Order.js
│   ├── routes/
│   │   └── orders.js
│   ├── services/
│   │   └── order.js
│   ├── utils/
│   │   └── apiClient.js
├── payment-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   ├── models/
│   │   └── Transaction.js
│   ├── routes/
│   │   └── payments.js
│   ├── utils/
│   │   └── rabbitmq.js
├── README.md

Prerequisites

Docker and Docker Compose: Required to run the services.
Node.js: Version 18+ (used in Docker containers).
MongoDB: Managed via Docker (mongo:6.0).
RabbitMQ: Managed via Docker (rabbitmq:3.12-management).

Setup Instructions

Clone the Repository:
git clone <repository-url>
cd ecommerce-microservices


Set Up Environment Variables:

The docker-compose.yml provides environment variables for each service. Ensure the following are set (already defined in docker-compose.yml):
MONGODB_URI: MongoDB connection string (e.g., mongodb://admin:password123@mongodb:27017/customer_db?authSource=admin).
RABBITMQ_URL: RabbitMQ connection (e.g., amqp://admin:password123@rabbitmq:5672).
CUSTOMER_SERVICE_URL, PRODUCT_SERVICE_URL, PAYMENT_SERVICE_URL (for Order Service).
PORT: Service-specific port (3001–3004).

Build and Run:
docker-compose up --build

This starts:

MongoDB (mongodb:27017)
RabbitMQ (rabbitmq:5672, management UI at http://localhost:15672, credentials: admin/password123)
Customer Service (http://localhost:3001)
Product Service (http://localhost:3002)
Order Service (http://localhost:3003)
Payment Service (http://localhost:3004)
Payment Worker (no HTTP endpoint)


Verify Services:

Check RabbitMQ management UI: http://localhost:15672 (login: admin/password123).
Connect to MongoDB (mongodb:27017, credentials: admin/password123) and verify seeded data in customer_db and product_db.


API Endpoints:

Customer Service:
GET /customers/:id: Fetch customer by customerId.


Product Service:
GET /products/:id: Fetch product by productId.


Order Service:
POST /orders: Create an order ({ customerId, productId, amount }).


Payment Service:
POST /payments: Initiate payment (internal, called by Order Service).


Seeded Data

Customer Service (customer_db):
cust1: John Doe, john@example.com
cust2: Gabriel Doe, gab@example.com
cust3: John Mark, mark@example.com
cust4: Debby Alice, debby@example.com
cust5: Mark Angel, angel@example.com


Product Service (product_db):
prod1: Laptop, price: 1000, stock: 5
prod2: Phone, price: 500, stock: 10



Architecture Flow

Client sends POST /orders to Order Service with { customerId, productId, amount }.
Order Service:
Validates customerId via Customer Service (GET /customers/:id).
Validates productId and amount via Product Service (GET /products/:id).
Creates order in order_db (status: pending).
Sends payment request to Payment Service (POST /payments).


Payment Service:
Simulates payment (always succeeds for demo).
Publishes transaction to RabbitMQ transactions queue.
Returns { orderStatus: "paid" }.


Order Service updates order status and returns response.
Payment Worker consumes from transactions queue and saves to payment_db.
