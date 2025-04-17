import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize("ecommerce", "postgres", "postgres", {
  host: "postgres-db",
  dialect: "postgres",
  logging: false,
});

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
