"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchuser, updateProfile } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const Dashboard = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({});

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      getData();
    }
  }, [router, session]);

  const getData = async () => {
    let u = await fetchuser(session.user.name);
    setForm(u);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    
  };

  const handleSubmit = async (e) => {
    
    
    let a = await updateProfile(e, session.user.name);
    
    
    toast("Profile is updated", {
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

      <div className="container mx-auto py-5 px-6">
        <h1 className="text-center my-5 text-3xl font-bold">
          Welcome to Your Dashboard
        </h1>
        <form className="max-w-2xl mx-auto" action={handleSubmit}>
          <div className="my-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium  dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              value={form.name ? form.name : ""}
              onChange={handleChange}
              name="name"
              id="name"
              className="block text-black w-full p-2  border-gray-300 rounded-lg bg-gray-50 text-us focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="my-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium  dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              value={form.email ? form.email : ""}
              onChange={handleChange}
              name="email"
              id="email"
              className="block text-black w-full p-2  border-gray-300 rounded-lg bg-gray-50 text-us focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="my-2">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium  dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              value={form.username ? form.username : ""}
              onChange={handleChange}
              name="username"
              id="username"
              className="block text-black w-full p-2  border-gray-300 rounded-lg bg-gray-50 text-us focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="my-2">
            <label
              htmlFor="profilepic"
              className="block mb-2 text-sm font-medium  dark:text-white"
            >
              Profile Image
            </label>
            <input
              type="text"
              value={form.profilepic ? form.profilepic : ""}
              onChange={handleChange}
              name="profilepic"
              id="profilepic"
              className="block text-black w-full p-2  border-gray-300 rounded-lg bg-gray-50 text-us focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="my-2">
            <label
              htmlFor="coverpic"
              className="block mb-2 text-sm font-medium  dark:text-white"
            >
              Cover Image
            </label>
            <input
              type="text"
              value={form.coverpic ? form.coverpic : ""}
              onChange={handleChange}
              name="coverpic"
              id="coverpic"
              className="block text-black w-full p-2  border-gray-300 rounded-lg bg-gray-50 text-us focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          {/* input razorpay id */}
          <div className="my-2">
            <label
              htmlFor="razorpayid"
              className="block mb-2 text-sm font-medium  dark:text-white"
            >
              Razorpay ID
            </label>
            <input
              type="text"
              value={form.razorpayid ? form.razorpayid : ""}
              onChange={handleChange}
              name="razorpayid"
              id="razorpayid"
              className="block text-black w-full p-2  border-gray-300 rounded-lg bg-gray-50 text-us focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          {/* input for razorpay secret */}
          <div className="my-2">
            <label
              htmlFor="razorpaysecret"
              className="block mb-2 text-sm font-medium  dark:text-white"
            >
              Razorpay secret
            </label>
            <input
              type="text"
              value={form.razorpaysecret ? form.razorpaysecret : ""}
              onChange={handleChange}
              name="razorpaysecret"
              id="razorpaysecret"
              className="block text-black w-full p-2  border-gray-300 rounded-lg bg-gray-50 text-us focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 mt-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
