import { Router } from "express";
import dashboardController from "./dashboard.controller.js";
import { protectedRoutes } from "../../middleware/protectedRoutes.js";
import { allowTo } from "../../middleware/allowTo.js";

const dashboardRouter = Router();

dashboardRouter.get("/", protectedRoutes,allowTo("admin"),dashboardController.getDashboard);




export default dashboardRouter;
