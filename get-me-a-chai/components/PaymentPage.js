"use client";
import React, { useState, useEffect, use } from "react";
import Script from "next/script";
import { initiate } from "@/actions/useractions";
import { useSession } from "next-auth/react";
import { fetchuser } from "@/actions/useractions";
import { fetchpayment } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";

const PaymentPage = ({ username }) => {
  const [paymentform, setPaymentform] = useState({name:"",message:"",amount:""});
  const [currentuser, setcurrentuser] = useState({});
  const [payment, setPayment] = useState([]);
  const router = useRouter();

  const searchParams = useSearchParams();
  console.log(username, "this is username from payment page");

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
    console.log(paymentform);
  };
  console.log(currentuser.razorpayid, "this is razorpay id");

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchParams.get("paymentdone") == "true" ) {
      toast("Payment successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
  }
  router.push(`/${username}`);
  }, []);

  console.log(username, "this is user name");

  const getData = async () => {
    let u = await fetchuser(username);
    setcurrentuser(u);
    let dbpayment = await fetchpayment(username);
    setPayment(dbpayment);
    console.log(u, dbpayment);
  };

  const pay = async (amount) => {
    if (!amount || amount <= 0) {
      console.error("Invalid amount:", amount);
      return alert("Please enter a valid amount before proceeding.");
    }
    let a = await initiate(amount, username, paymentform);
    if (!a || !a.id) {
      console.error("Failed to get order ID from Razorpay API:", a);
      return alert("Error initiating payment. Please try again.");
    }
    let orderId = a.id;
    var options = {
      // key: process.env.NEXT_PUBLIC_KEY_ID,
      key: currentuser.razorpayid,
      amount: amount, // 2000 paise = INR 20
      name: "Buy me a chai",
      currency: "INR",
      description: "Test Transaction",
      image: "/your_logo.png",
      order_id: orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: paymentform.name || "Anonymous",
        email: "mohammadayan2210@gmail.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };
  
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="cover w-full bg-red relative">
        <img
          className="object-cover w-full h-96"
          src={currentuser.coverpic || "cover.jpg"}
          alt=""
        />
        <div className="absolute bottom-0 left-[45%] right-0 p-4">
          <img
            className="w-24 h-24 rounded-full border-4 border-white absolute -bottom-12 left-4"
            src={currentuser.profilepic || "avatar2.gif"}
            alt=""
          />
        </div>
      </div>
      <div className="info flex justify-center items-center my-24 flex-col gap-2 mb-32">
        <div className="font-bold text-lg">@{String(username)}</div>
        <div className="text-slate-400">lets help {username} to get a chai</div>
        <div className="text-slate-400">
          {payment.length} payments. ${payment.reduce((a,b)=>a+b.amount,0)} raised
        </div>
        <div className="payment flex gap-3 w-[80%] mt-11">
          <div className="supporters w-1/2 bg-slate-900 rounded-lg text-white p-4">
            {/* show list of all the supporters as a leaderboard */}
            <h2 className="text-2xl font-bold my-5">Supporters</h2>
            <ul className="mx-4">
              {payment.length === 0 && (
                <div className="text-center">No payments yet</div>
              )}
              {payment.map((p, i) => {
                return (
                  <li key={i} className="my-4 flex gap-2 items-center">
                    <img width={33} src="avatar2.gif" alt="user avatar" />
                    <span>
                      {p.name} <span className="font-bold">${p.amount}</span>{" "}
                      {p.message}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="makePayment w-1/2 bg-slate-900 rounded-lg text-white p-10">
            <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex gap-3 flex-col">
              {/* input for name and message */}
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="bg-slate-800 text-white p-2 rounded-lg w-full"
                  onChange={handleChange}
                  name="name"
                  value={paymentform.name}
                />
              </div>
              <input
                type="text"
                placeholder="Message"
                className="bg-slate-800 text-white p-2 rounded-lg w-full"
                onChange={handleChange}
                name="message"
                value={paymentform.message}
              />
              <input
                type="number"
                placeholder="Amount"
                className="bg-slate-800 text-white p-2 rounded-lg w-full"
                onChange={handleChange}
                name="amount"
                value={paymentform.amount}
              />
              <button
                onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}
                className="bg-blue-700 text-white p-2 rounded-lg w-full disabled:bg-slate-600 disabled:from-slate-900"
                disabled={
                  paymentform.name?.length < 3 ||
                  paymentform.message?.length < 4 ||
                  paymentform.amount?.length<1
                }
              >
                Pay
              </button>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(1000)}
              >
                Pay ₹10
              </button>
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(2000)}
              >
                Pay ₹20
              </button>
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(3000)}
              >
                Pay ₹30
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
