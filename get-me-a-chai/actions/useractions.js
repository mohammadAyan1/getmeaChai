"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/db/dbConnect";
import User from "@/models/User";


export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();
  // fetch the secret key of the user who is getting the payment
  let user = await User.findOne({ username: to_username });
  const secret = user.razorpaysecret;

  var instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: secret,
  });

  let option = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  let x = await instance.orders.create(option);
  

  // create a payment object which shows a pendind payment in the database
  await Payment.create({
    oid: x.id,
    amount: amount / 100,
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
  let p = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .lean();
  return p;
};

export const updateProfile = async (data, oldusername) => {
  await connectDB();
  let ndata = Object.fromEntries(data);

  
  // if the username is being updated, check if the  username is available
  if (oldusername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username });
  
    
    if (u) {
      return { error: "Username already exists" };
    }
    await User.updateOne({email:ndata.email},ndata)
    // now update all the username in tthe payments table
    await Payment.updateMany({to_user:oldusername},{to_user:ndata.username})
  }
  else{
    await User.updateOne({ email: ndata.email }, ndata);
  }
  // await User.update({ username: oldusername }, { username: ndata.username });
};
