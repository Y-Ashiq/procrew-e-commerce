import { Sequelize } from "sequelize";
import 'dotenv/config';

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, 
      },
    },
    
  }
);

// 'postgres-db' || 'postgres' ||

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("error" + error);
  });

export default sequelize;
