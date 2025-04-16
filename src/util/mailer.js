import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 587, 
  secure: false,
  auth: {
    user: "super127x@gmail.com",
    pass: "tnmcwibyqgflodco"
  },
  service: 'gmail',
  
});

export const sendOrderStatusEmail = async ({ to, orderId, status }) => {
  const mailOptions = {
    from: "no reply <super127x@gmail.com>",
    to,
    subject: `Your Order #${orderId} Status Updated`,
    html: `
      <p>Your order <strong>#${orderId}</strong> status has been updated to: <strong>${status.toUpperCase()}</strong>.</p>
      <p>Thank you for shopping with us!</p>
    `
  };

  await transporter.sendMail(mailOptions);
};
