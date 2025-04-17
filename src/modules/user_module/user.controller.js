import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../util/AppError.js";
import jwt from "jsonwebtoken";
import userSchema from "../../../database/models/users.model.js";
import bcrypt from "bcryptjs";

const register = handleError(async (req, res, next) => {
  let { email, password, role } = req.body;

  let isExist = await userSchema.findOne({ where: { email } });

  if (isExist) return next(new AppError("this user is already exist", 409));

  password = bcrypt.hashSync(password, 5);
  await userSchema.create({ email, role, password });

  res.json({ message: "user created successfully" });
});

const signIn = handleError(async (req, res, next) => {
  let { email, password } = req.body;

  let isExist = await userSchema.findOne({ where: { email } });
  if (!isExist) return next(new AppError("no records", 409));

  const isMatch = bcrypt.compareSync(password, isExist.password);

  if (isExist && isMatch) {
    let token = jwt.sign(
      { id: isExist.id, role: isExist.role },
      "mysecrettoken"
    );

    return res.json({ message: "welcome", token });
  } else {
    return next(new AppError("wrong password or email", 409));
  }
});

export default { register, signIn };
