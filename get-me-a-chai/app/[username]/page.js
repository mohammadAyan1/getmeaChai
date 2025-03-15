// "use client";
import PaymentPage from "@/components/PaymentPage";
import React from "react";
import { notFound } from "next/navigation";
import connectDB from "@/db/dbConnect";
import User from "@/models/User";

const Username = async ({ params }) => {
  const checkUser = async () => {
    await connectDB();
    let u = await User.findOne({ username: params.username });
    if (!u) {
      return notFound();
    }
  };

  await checkUser();
  const { username } = params;
  console.log(username, "this is username");

  return (
    <>
      <PaymentPage username={username} />
    </>
  );
};

export default Username;
