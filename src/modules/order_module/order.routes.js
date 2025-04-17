import { Router } from "express";
import orderController from "./order.controller.js";
import { protectedRoutes } from "../../middleware/protectedRoutes.js";
import { allowTo } from "../../middleware/allowTo.js";

const orderRouter = Router();

orderRouter.post(
  "/",
  protectedRoutes,
  allowTo("customer"),
  orderController.createOrder
);
orderRouter.get(
  "/trackOrder/:id",
  protectedRoutes,
  allowTo("customer"),
  orderController.trackOrder
);

orderRouter.post(
  "/stripePay/:id",
  protectedRoutes,
  allowTo("customer"),
  orderController.payWithStripe
);

orderRouter.get(
  "/exportcsv",
  protectedRoutes,allowTo("admin"),
  orderController.exportCSV
);

orderRouter.post(
  "/orderStatus",
  protectedRoutes,
  allowTo("admin"),
  orderController.changeOrderStatus
);

export default orderRouter;
