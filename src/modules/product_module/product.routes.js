import { Router } from "express";
import productController from "./product.controller.js";
import { protectedRoutes } from "../../middleware/protectedRoutes.js";
import { allowTo } from "../../middleware/allowTo.js";

const productRouter = Router();

productRouter.get("/", productController.getAllProduct);

productRouter.post(
  "/",
  protectedRoutes,
  allowTo("admin"),
  productController.addProduct
);

productRouter
  .route("/:id")
  .put(protectedRoutes, allowTo("admin"), productController.updateProduct)
  .delete(protectedRoutes, allowTo("admin"), productController.deleteProduct);

export default productRouter;
