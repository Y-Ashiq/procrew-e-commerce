### **README: ecommerce**

---



#### **Overview**
This application is a **simple E-commerce app** built using the following technologies:
- **Express.js**: This is for building the RESTful API.
- **Sequelize ORM**: To interact with a **MySQL** database.
- **postgres**: For database connection and queries.
- **JWT (JSON Web Token)**: For user authentication and token generation.
- **bcrypt**: For securely hashing user passwords.
- **nodemailer**: For sending email notifications.
- **redis**: For caching the data.
- **express-rate-limit**: Protect the API from abuse.
- **Stripe**: Payment gateway

The App supports functionalities: user registration, sign in, make an Order, add Products, track the order status, and payment gateway

---

#### **setup instructions**
If you're going to clone the Code, make sure you have nodejs on your machine
Then open Terminal on the project file and enter **npm install**. This will install dependencies that are used for the project 


#### **Another setup instructions with Docker compose**

Open the terminal on the project file and make sure you have Docker on your machine. Then, enter **docker-compose up-- build**
This will build a Docker image and make a container that can run on your machine without installing nodejs or anything on your machine 

### postman documentation
https://documenter.getpostman.com/view/17578628/2sB2cd4HhC


*note: this project had a conflict with the server host I deployed with Redis and Stripe, so I couldn't provide the live API URL**


**for documentation and how to use the endpoint**
### postman documentation
https://documenter.getpostman.com/view/17578628/2sB2cd4HhC


### The challenges that I faced 
*was in designing the database and making it compatible with the project 
and implementing the payment gateway and dealing with the errors in Docker**


---

#### **Technologies Used**
- **Backend Framework**: [Express.js](https://expressjs.com/)
- **Database**: [Postgres]
- **ORM**: [Sequelize](https://sequelize.org/)
- **Password Hashing**: [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Authentication**: [jsonwebtoken (JWT)](https://github.com/auth0/node-jsonwebtoken)

