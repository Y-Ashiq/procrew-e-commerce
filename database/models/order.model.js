import sequelize from "../DBconnection.js";
import { DataTypes } from "sequelize";

const orderSchema = sequelize.define("orders", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
    references: {
      model: "users",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  cartItems: {
    type: DataTypes.JSONB,
    allowNull: false,
    field: "cart_items",
    defaultValue: [],
  },
  status: {
    type: DataTypes.ENUM(
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled"
    ),
    allowNull: false,
    defaultValue: "pending",
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    field: "total_amount",
    validate: {
      min: 0,
    },
  },
  paid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: "created_at",
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: "updated_at",
  },
});

export default orderSchema;
