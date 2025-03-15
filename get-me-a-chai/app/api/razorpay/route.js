import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDB from "@/db/dbConnect";
import User from "@/models/User";

export const POST = async (req, res) => {
    await connectDB();
    let body = await req.formData();
    body = Object.fromEntries(body);
    console.log(body);
    

    // check if razopayOrderId is present in the server
    let p = await Payment.findOne({oid:body.razorpay_order_id});
    if(!p){
        return NextResponse.json({success:false, message:"Payment not found"});
    }

    // fetch the secret key of the user who is getting the payment
    let user = await User.findOne({username:p.to_user});
    const secret = user.razorpaysecret;

    // verify the payment
    let verified = validatePaymentVerification({"order_id": body.razorpay_order_id,"payment_id": body.razorpay_payment_id}, body.razorpay_signature, secret);

    if(verified){
        // update the payment status
        const updatedPayment = await
        Payment.findOneAndUpdate({oid:body.razorpay_order_id},{done:"true"},{new:true});
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`);
    }
    else
    {
        return NextResponse.json({success:false, message:"Payment Verification Failed"});
    }
}