// "use client";
import PaymentPage from "@/components/PaymentPage";
import React from "react";

const Username = ({ params }) => {
  
  const username =  params;
  console.log(username,"this is username");

  return (
    <>
     <PaymentPage username={username}/>
    </>
  );
};

export default Username;
