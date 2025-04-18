#  E-commerce Backend API

##  Overview

This project is a **simple E-commerce backend application** built with modern technologies to provide a robust and secure foundation for any online store. It includes features such as user authentication, product management, order processing, and payment integration.

###  Tech Stack

- **Backend Framework**: [Express.js](https://expressjs.com/) — For building the RESTful API
- **Database**: [PostgreSQL](https://www.postgresql.org/) — Relational database
- **ORM**: [Sequelize](https://sequelize.org/) — For object-relational mapping
- **Authentication**: [JWT](https://github.com/auth0/node-jsonwebtoken) — Secure token-based authentication
- **Password Hashing**: [bcrypt](https://github.com/kelektiv/node.bcrypt.js) — Secure password encryption
- **Email Notifications**: [nodemailer](https://nodemailer.com/about/) — Send transactional emails
- **Rate Limiting**: [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) — Prevent API abuse
- **Caching**: [Redis](https://redis.io/) — Improve performance with caching
- **Payments**: [Stripe](https://stripe.com/) — Payment processing

---

##  Features

- User registration & login with secure password hashing  
-  JWT-based authentication  
-  Product management  
-  Order creation and tracking  
-  Stripe payment integration  
-  Email notifications  
-  API rate limiting  
-  Redis caching support  

---

##  Setup Instructions

###  Local Setup

1. **Install Node.js** (if not already installed)  
2. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables in a `.env` file (DB credentials, JWT secret, Stripe keys, etc.)
5. Start the development server:
   ```bash
   npm start
   ```

---

###  Docker Setup (Optional)

If you prefer using Docker:

1. Make sure [Docker](https://www.docker.com/) is installed
2. Run:
   ```bash
   docker-compose up --build
   ```

This will spin up containers for the app, database, and Redis cache.

---

##  API Documentation

For full API usage and available endpoints, check out the Postman documentation:

 [Postman Docs](https://documenter.getpostman.com/view/17578628/2sB2cd4HhC)

> **Note:** Due to deployment issues involving Redis and Stripe, a live API URL is not currently available.

---

## ⚠ Challenges Faced

- Database schema design and integration with Sequelize  
- Stripe payment implementation and handling edge-case errors  
- Docker compatibility, especially with Redis service coordination  

---

