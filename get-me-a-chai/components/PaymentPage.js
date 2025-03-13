"use client";
import React, { useState, useEffect, use } from "react";
import Script from "next/script";
import { initiate } from "@/actions/useractions";
import { useSession } from "next-auth/react";
import { fetchuser } from "@/actions/useractions";
import { fetchpayment } from "@/actions/useractions";

const PaymentPage = ({ username }) => {
  const [paymentform, setPaymentform] = useState({});
  const [currentuser, setcurrentuser] = useState({});
  const [payment, setPayment] = useState([]);
  const { data: session } = useSession();
  console.log(username, "this is username from payment page");

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
    console.log(paymentform);
  };
  useEffect(() => {
    getData();
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
      key: process.env.NEXT_PUBLIC_KEY_ID,
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
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="cover w-full bg-red relative">
        <img
          className="object-cover w-full h-96"
          src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/18.gif?token-time=1743724800&token-hash=3jRRjnWnIycOk6k6K03qY-fepaDiVq5PShRw7Y2mnLQ%3D"
          alt=""
        />
        <div className="absolute bottom-0 left-[45%] right-0 p-4">
          <img
            className="w-24 h-24 rounded-full border-4 border-white absolute -bottom-12 left-4"
            src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/18.gif?token-time=1743724800&token-hash=3jRRjnWnIycOk6k6K03qY-fepaDiVq5PShRw7Y2mnLQ%3D"
            alt=""
          />
        </div>
      </div>
      <div className="info flex justify-center items-center my-24 flex-col gap-2 mb-32">
        <div className="font-bold text-lg">@{username}</div>
        <div className="text-slate-400">creating Animated art for VITs</div>
        <div className="text-slate-400">
          9,719 members . 82 posts . $15,450/released
        </div>
        <div className="payment flex gap-3 w-[80%] mt-11">
          <div className="supporters w-1/2 bg-slate-900 rounded-lg text-white p-4">
            {/* show list of all the supporters as a leaderboard */}
            <h2 className="text-2xl font-bold my-5">Supporters</h2>
            <ul className="mx-4">
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
              <button onClick={()=>pay(paymentform.amount)} className="bg-blue-700 text-white p-2 rounded-lg w-full">
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
