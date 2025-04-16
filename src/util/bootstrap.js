import userRouter from "../modules/user_module/user.routes.js";
import productRouter from "../modules/product_module/product.routes.js";
import orderRouter from "../modules/order_module/order.routes.js";
export const BootStrap = (app) => { 

    app.use("/api/v1/users", userRouter);
    app.use("/api/v1/products", productRouter);
    app.use("/api/v1/order", orderRouter);
}
