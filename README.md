# Bookstore Microservices

This project implements an online bookstore using a microservices architecture. It consists of two independent services:

## Services

### 1. User Service (Node.js / Express)
- Handles user registration, authentication, and profile management.
- Uses MySQL as the database.
- Runs on `http://localhost:3000`.
- Implements RESTful APIs for user-related operations.
- Technologies: Node.js, Express, Sequelize ORM, MySQL.

### 2. Catalog Service (Python / Flask)
- Manages the book catalog including adding, updating, deleting, and retrieving books.
- Uses a JSON file for storing book data.
- Runs on `http://localhost:8080`.
- Implements RESTful APIs for catalog operations.
- Technologies: Python, Flask.

## Prerequisites

- Docker Desktop with Docker Compose installed.
- Node.js and npm (for local development).
- Python 3.8+ with Flask installed (virtual environment recommended).
- MySQL server (local or Docker container).

## How to Run Locally (without Docker)

### User Service

1. Navigate to `user-service` folder.
2. Configure `.env` file with your MySQL settings.
3. Install dependencies:
npm install

text
4. Run the server:
npm run dev

text
5. The service will be available on `http://localhost:3000`.

### Catalog Service

1. Navigate to `catalog-service` folder.
2. Activate your Python virtual environment with Flask installed.
3. Run the service:
python run.py

text
4. The service will be available on `http://localhost:8080`.

## How to Run with Docker Compose (Recommended)

1. In the project root where `docker-compose.yml` is located, run:
docker-compose up --build

text
2. This will start the MySQL database, User Service, and Catalog Service containers.
3. Access:
- User Service: `http://localhost:3000`
- Catalog Service: `http://localhost:8080`

## Testing the APIs

Use tools like Postman or curl to test endpoints. For example:

- Register a User:
POST http://localhost:3000/api/users/register
Body: { "username": "john", "email": "john@example.com", "password": "pass123" }

text

- Get All Books:
GET http://localhost:8080/api/catalog/books

text

## Architecture Overview

text
    +------------------+
    |  Client / Browser |
    +---------+--------+
              |
      +-------+------+
      |   API Gateway  |(optional in this project)
      +-------+------+
      |              |
+-----+------+ +-----+------+
| User Service| |Catalog Service|
| (Node.js)   | | (Python Flask)|
+-------------+ +-------------+
      |               |
  +---+--+        +---+---+
  | MySQL |        |books.json|
  +-------+        +---------+
text

## Assumptions and Notes

- The Catalog Service uses a JSON file for simplicity instead of a NoSQL database.
- You have the option to swap the Catalog Service implementation with Java Spring Boot.
- Docker containers enable easier deployment consistency.
- CI/CD pipelines are not included in this version but can be added.

## Contact

Developed by: Naeem Ur Rahman