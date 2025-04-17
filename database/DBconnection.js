import { Sequelize } from "sequelize";

const sequelize = new Sequelize("ecommerce", "postgres", "admin", {
  host: "localhost",
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
