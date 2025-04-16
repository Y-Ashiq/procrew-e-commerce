import { AppError } from "../util/AppError.js";
import { handleError } from "./handleError.js";

export const allowTo = (...role) => {
  return handleError(async (req, res, next) => {

    
    if (role == req.user.role) return next();

    return next(new AppError("not authorized", 401));
  });
};
