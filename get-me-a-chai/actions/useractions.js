"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/db/dbConnect";
import User from "@/models/User";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();
  var instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  let option = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  let x = await instance.orders.create(option);
  console.log(x, "xfffffffffffffffffffffffff");

  // create a payment object which shows a pendind payment in the database
  await Payment.create({
    oid: x.id,
    amount: amount,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  });
  return x;
};

export const fetchuser = async (username) => {
  await connectDB();
  let u = await User.findOne({ username: username });
  let user = u.toObject({ flattenObjectIds: true });
  return user;
};

export const fetchpayment = async (username) => {
  await connectDB();
  // find all payments sorted by decending order of amount and flatten the object id
  let p = await Payment.find({ to_user: username }).sort({ amount: -1 }).lean();
  return p;
}