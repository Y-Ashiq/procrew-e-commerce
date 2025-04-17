import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../util/AppError.js";
import orderSchema from "../../../database/models/order.model.js";
import userSchema from "../../../database/models/users.model.js";


const getDashboard = handleError(async (req, res, next) => {
  const totalOrders = await orderSchema.count();

  const totalCustomers = await userSchema.count({ where: { role: "customer" } });

  const OrdersRevnue = await orderSchema.sum("totalAmount");

  const allOrders = await orderSchema.findAll();

  res.json({
    message: "Dashboard data fetched successfully",
    data: {
      totalOrders,
      totalCustomers,
      OrdersRevnue,
      allOrders,
    },
  });});

export default {
  getDashboard,
};
