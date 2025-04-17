import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../util/AppError.js";
import orderSchema from "../../../database/models/order.model.js";
import productSchema from "../../../database/models/product.model.js";
import { sendOrderStatusEmail } from "../../util/mailer.js";
import { createCheckoutSession } from "../../payment/stripe.js";
import { Parser } from "json2csv";
import { Op } from "sequelize";

//========================== function to calcultae the total price =============================//
function calculateTotal(items, cartItems) {
  let totalPrice = 0;

  items.forEach((item) => {
    const cartItem = cartItems.find((ci) => ci.productId === item.id);
    const quantity = cartItem ? cartItem.quantity : 1;
    totalPrice += parseFloat(item.price) * quantity;
  });

  return totalPrice;
}

//========================== create user order =============================//

const createOrder = handleError(async (req, res, next) => {
  const productIds = req.body.cartItems;

  const products = productIds.map((IDs) => IDs.productId);

  let isExist = await productSchema.findAll({
    where: {
      id: {
        [Op.in]: products,
      },
    },
  });

  let result = isExist.map((IDs) => IDs.dataValues);

  if (result.length == 0) {
    return next(new AppError(`this products are not exist ,${result}`, 409));
  }

  let totalPrice = calculateTotal(result, req.body.cartItems);

  req.body.totalAmount = totalPrice;

  req.body.userId = req.user.dataValues.id;

  await orderSchema.create(req.body);
  res.json({ message: "Order created successfully" });
});

//========================== change order status by Admins =============================//

const changeOrderStatus = handleError(async (req, res, next) => {
  let { email, status } = req.body;
  let orderId = req.params.id;

  await orderSchema.update({ status }, { where: { id: orderId } });

  sendOrderStatusEmail({ to: email, orderId, status }); //(nodemailer) this function used to send email notification to user when the status is chnaged

  res.json({ message: "Status changed successfully" });
});

//========================== Stripe Payment =============================//

const payWithStripe = handleError(async (req, res, next) => {
  let orderId = req.params.id;

  const order = await orderSchema.findOne({ where: { id: orderId } });

  if (!order) return next(new AppError("no records", 404));

  if (req.user.id !== order.dataValues.userId) {
    return next(new AppError("something went wrong", 409));
  }

  const products = order.cartItems.map((IDs) => IDs.productId);

  let isExist = await productSchema.findAll({
    where: {
      id: {
        [Op.in]: products,
      },
    },
  });

  let productData = isExist.map((product) => product.dataValues);
  let combinedProducts = order.cartItems.map((cartItem) => {
    const product = productData.find((p) => p.id === cartItem.productId);
    return {
      ...product,
      quantity: cartItem.quantity,
      total: product.price * cartItem.quantity,
    };
  });
  combinedProducts.ordeId = order.dataValues.id;

  const paymentObject = {
    customer_email: req.user.email,
    metadata: { orderID: combinedProducts.ordeId },

    line_items: combinedProducts.map((item) => {
      return {
        price_data: {
          currency: "EGP",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    }),
  };

  const checkOutSession = await createCheckoutSession(paymentObject);

  res.json({ checkOutSession });
});

//========================== Stripe webhook to track the events (session completed) =============================//

const webHook = handleError(async (req, res, next) => {
  const orderId = req.body.data.object.metadata.orderID * 1;

  await orderSchema.update(
    { status: "processing", paid: true },
    { where: { id: orderId } }
  );

  res.status(200).json({ message: "webhook recieved" });
});

//========================== export orders data in CSV for Admins =============================//

const exportCSV = handleError(async (req, res, next) => {
  let isExist = await orderSchema.findAll();

  if (!isExist) return next(new AppError("no records", 409));

  const parser = new Parser();
  const csv = parser.parse(isExist.map((o) => o.toJSON()));

  res.header("Content-Type", "text/csv");
  res.attachment("orders.csv");
  res.send(csv);
});

//========================== users track their order =============================//

const trackOrder = handleError(async (req, res, next) => {
  const id = req.params.id;

  let isExist = await orderSchema.findOne({
    where: { id },
    attributes: ["id", "cartItems", "status", "user_id", "totalAmount"],
  });

  if (!isExist) return next(new AppError("no records", 409));
  if (req.user.dataValues.id !== isExist.dataValues.user_id) {
    return next(new AppError("no records to show", 409));
  } else {
    res.json({ satuts: isExist });
  }
});

const orderHistory = handleError(async (req, res, next) => {
  let isExist = await orderSchema.findAll({
    where: { user_id: req.user.dataValues.id },
  });
  if (!isExist) return next(new AppError("no records", 409));
  res.json({ order_History: isExist });
});

export default {
  createOrder,
  changeOrderStatus,
  payWithStripe,
  exportCSV,
  trackOrder,
  webHook,
  orderHistory
};
