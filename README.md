# InspireAPI Backend

This repository contains the backend service for InspireAPI, a MERN stack application providing a RESTful API for inspirational quotes. This backend showcases modern DevOps practices including Docker containerization, CI/CD integration, secure environment management, and scalable API design.

## Features

- RESTful API built with Express.js and MongoDB
- Dockerized backend with production-optimized Dockerfile
- Database seeding with categorized inspirational quotes
- Basic security features: Helmet, CORS, rate limiting
- Structured logging using Winston
- Health check endpoint for monitoring

## Getting Started

### Prerequisites

- Docker
- Node.js (for local development)

### Quick Start

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/inspireapi-backend.git
    cd inspireapi-backend
    ```

2. Build and start using Docker:
    ```bash
    docker build -t inspireapi-backend -f docker/dockerfile.backend .
    docker run -p 5000:5000 --env-file .env inspireapi-backend
    ```

3. For development, install dependencies and run locally:
    ```bash
    npm install
    npm run dev
    ```

## Configuration

Create a `.env` file containing:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quotesapi
NODE_ENV=development
```

## License

This project is licensed under the MIT License.