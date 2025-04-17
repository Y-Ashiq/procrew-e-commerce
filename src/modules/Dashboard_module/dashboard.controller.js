import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../util/AppError.js";
import orderSchema from "../../../database/models/order.model.js";
import userSchema from "../../../database/models/users.model.js";

function calculateTotal(items, cartItems) {
  let totalPrice = 0;

  items.forEach((item) => {
    const cartItem = cartItems.find((ci) => ci.productId === item.id);
    const quantity = cartItem ? cartItem.quantity : 1;
    totalPrice += parseFloat(item.price) * quantity;
  });

  return totalPrice;
}

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
