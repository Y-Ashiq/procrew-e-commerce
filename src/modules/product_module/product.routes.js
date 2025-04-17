import { Router } from "express";
import productController from "./product.controller.js";
import { protectedRoutes } from "../../middleware/protectedRoutes.js";
import { allowTo } from "../../middleware/allowTo.js";
import { prodcutValidation } from "./product.validation.js";
import { validation } from "../../middleware/validate.js";

const productRouter = Router();

productRouter.get("/", productController.getAllProduct);

productRouter.post(
  "/",
  protectedRoutes,
  allowTo("admin"),
  validation(prodcutValidation),

  productController.addProduct
);
productRouter.post(
  "/bulkImport",
  protectedRoutes,
  allowTo("admin"),

  productController.bulkAddProduct
);

productRouter
  .route("/:id")
  .put(protectedRoutes, allowTo("admin"), productController.updateProduct)
  .delete(protectedRoutes, allowTo("admin"), productController.deleteProduct);

export default productRouter;
