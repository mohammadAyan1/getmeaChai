import React from "react";

const Username = ({ params }) => {
  return (
    <>
      <div className="cover w-full bg-red relative  ">
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
        <div className="font-bold text-lg">@{params.username}</div>
        <div className="text-slate-400">creating Animated art for VIT's</div>
        <div className="text-slate-400">
          9,719 members . 82 posts . $15,450/released
        </div>
        <div className="payment flex gap-3 w-[80%] mt-11">
          <div className="supporters w-1/2 bg-slate-900 rounded-lg text-white p-4">
            {/* show list of all the supporters as a leaderboard */}
            <h2 className="text-2xl font-bold my-5">Supporters</h2>
            <ul className="mx-4">
              <li className="my-4 flex gap-2 items-center">
                <img width={33} src="avatar2.gif" alt="user avatar" />
                <span>
                  Shubham donated <span className="font-bold">$30</span> with a
                  message {"i support you bro"}
                </span>
              </li>
              <li className="my-4 flex gap-2 items-center">
                <img width={33} src="avatar2.gif" alt="user avatar" />
                <span>
                  Shubham donated <span className="font-bold">$30</span> with a
                  message {"i support you bro"}
                </span>
              </li>
              <li className="my-4 flex gap-2 items-center">
                <img width={33} src="avatar2.gif" alt="user avatar" />
                <span>
                  Shubham donated <span className="font-bold">$30</span> with a
                  message {"i support you bro"}
                </span>
              </li>
              <li className="my-4 flex gap-2 items-center">
                <img width={33} src="avatar2.gif" alt="user avatar" />
                <span>
                  Shubham donated <span className="font-bold">$30</span> with a
                  message {"i support you bro"}
                </span>
              </li>
              <li className="my-4 flex gap-2 items-center">
                <img width={33} src="avatar2.gif" alt="user avatar" />
                <span>
                  Shubham donated <span className="font-bold">$30</span> with a
                  message {"i support you bro"}
                </span>
              </li>
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
                />
              </div>
              <input
                type="text"
                placeholder="Message"
                className="bg-slate-800 text-white p-2 rounded-lg w-full"
              />
              <input
                type="number"
                placeholder="Amount"
                className="bg-slate-800 text-white p-2 rounded-lg w-full"
              />
              <button className="bg-blue-700 text-white p-2 rounded-lg w-full">
                Pay
              </button>
            </div>
            <div className="flex gap-3 mt-5">
              <button className="bg-slate-800 p-3 rounded-lg">Pay $10</button>
              <button className="bg-slate-800 p-3 rounded-lg">Pay $20</button>
              <button className="bg-slate-800 p-3 rounded-lg">Pay $30</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Username;
