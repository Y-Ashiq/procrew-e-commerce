import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../util/AppError.js";
import productSchema from "../../../database/models/product.model.js";
import { Op } from "sequelize";
import redis from "../../util/caching.js";

const addProduct = handleError(async (req, res, next) => {
  let { name } = req.body;

  let isExist = await productSchema.findOne({ where: { name } });

  if (isExist) return next(new AppError("this product is already exist", 409));

  await productSchema.create(req.body);

  res.json({ message: "product created successfully" });
});

const bulkAddProduct = handleError(async (req, res, next) => {
  const Req_names = req.body.products;

  const products = Req_names.map((names) => names.name);

  let isExist = await productSchema.findAll({
    where: {
      name: {
        [Op.in]: products,
      },
    },
  });

  let result = isExist.map((names) => names.dataValues.name);

  if (result.length > 0) {
    return next(new AppError(`this products are already exist ,${result}`, 409));
  } else {

    await productSchema.bulkCreate(req.body.products)
    res.json({ message: "product created successfully" });
  }
});

//

const updateProduct = handleError(async (req, res, next) => {
  const id = req.params.id;

  let isExist = await productSchema.findOne({ where: { id } });

  if (!isExist) {
    return next(new AppError("no records", 404));
  } else {
    await productSchema.update(req.body, {
      where: { id: req.params.id },
    });

    res.status(200).json({ message: "product updated successfully" });
  }
});

const deleteProduct = handleError(async (req, res, next) => {
  const id = req.params.id;

  let isExist = await productSchema.findOne({ where: { id } });

  if (!isExist) {
    return next(new AppError("no records", 404));
  } else {
    await productSchema.destroy({ where: { id } });

    res.status(200).json({ message: "product deleted successfully" });
  }
});



const getAllProduct = handleError(async (req, res, next) => {
  const { category, minPrice, maxPrice, available } = req.query;

  let filter = {};

  if (category) {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};

    if (minPrice) {
      filter.price[Op.gte] = parseFloat(minPrice);
    }

    if (maxPrice) {
      filter.price[Op.lte] = parseFloat(maxPrice);
    }
  }

  if (available !== undefined) {
    filter.available = available === "true";
  }

  let cache = await redis.get("products");

  if (!cache) {
    let products = await productSchema.findAll(filter);
    await redis.setex("products", 10, JSON.stringify(products));

    if (!products) {
      return next(new AppError("no records", 404));
    } else {
      res.status(200).json({ products });
    }
  } else {
    res.status(200).json({ products: JSON.parse(cache) });
  }
});

export default {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  bulkAddProduct,
};
