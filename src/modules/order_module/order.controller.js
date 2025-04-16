import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../util/AppError.js";
import orderSchema from "../../../database/models/order.model.js";
import { sendOrderStatusEmail } from "../../util/mailer.js";
import { createCheckoutSession } from "../../payment/stripe.js";

function calculateTotal(items) {
  let totalPrice = 0;

  items.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  return totalPrice;
}

const createOrder = handleError(async (req, res, next) => {


  let totalPrice = calculateTotal(req.body.cartItems);

  req.body.totalAmount = totalPrice;

  await orderSchema.create(req.body);
  res.json({ message: "Order created successfully" });
});

const changeOrderStatus = handleError(async (req, res, next) => {
  let { orderId, email, status } = req.body;

  await orderSchema.update({ status }, { where: { id: orderId } });

  sendOrderStatusEmail({ to: email, orderId, status });

  res.json({ message: "Status changed successfully" });
});


const payWithStripe = handleError(async (req, res, next) => {
  let orderId = req.params.id;

  const order = await orderSchema.findOne({where:{id:orderId}})

  if (!order) return next(new AppError("no records", 404));


const paymentObject ={
  customer_email : req.user.email,
  line_items:order.cartItems.map(item=>{

    return{
      price_data:{

        currency: 'EGP',
        product_data:{
          name:item.name
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }
  })
} 



const checkOutSession = await createCheckoutSession(paymentObject)


  res.json({ checkOutSession});
});



export default { createOrder, changeOrderStatus,payWithStripe };
