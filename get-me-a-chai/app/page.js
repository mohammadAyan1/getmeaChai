

export default function Home() {
  return (
    <>
      <div>
        <div className="flex flex-col gap-4 justify-center items-center text-white h-[44vh]">
          <div className="font-bold text-5xl flex gap-2 justify-center items-center">
            Buy Me A Chai{" "}
            <span>
              <img
                src="https://media2.giphy.com/media/9h4w5cyUsl7jwgwjTh/giphy.gif?cid=6c09b952syux7mv6nxaiozx7y5hrgmtfvba60djgpc8cthey&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
                width={44}
                height={44}
                alt="Chai GIF"
              />
            </span>
          </div>
          <p>
            A crowdfunding platform for creators. Get funded by your fans and
            followers. Start now.
          </p>
          <div>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Start Here
            </button>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Read More
            </button>
          </div>
        </div>
        <div className="bg-white h-1 opacity-20"></div>

        <div className="text-white container mx-auto py-32">
          <h2 className="text-2xl font-bold text-center my-12">
            Your Fans Buy You a Chai
          </h2>
          <div className="flex gap-5 justify-around">
            <div className="item space-y-3 flex flex-col items-center justify-center">
              <img
                className="rounded-full bg-slate-400 p-2"
                width={88}
                height={88}
                src="https://media3.giphy.com/media/Pq2vkvaLURkntuqwsm/200w.gif?cid=6c09b9523bq1drmgs7hqov1bycnqjj1b8t6ixl9r999jd7s4&ep=v1_gifs_search&rid=200w.gif&ct=g"
                alt="Fund Yourself"
              />
              <p className="font-bold">Fund Yourself</p>
              <p className="text-center">
                Your fans are available to help you.
              </p>
            </div>
            <div className="item space-y-3 flex flex-col items-center justify-center">
              <img
                className="rounded-full bg-slate-400 p-2"
                width={88}
                height={88}
                src="https://media4.giphy.com/media/OccMlQrNO0YU4zFchY/giphy.gif?cid=6c09b9524xdw7mwtngnuedcn6zwd3xrruqsqq3lrohstf2xc&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
                alt="Support GIF"
              />
              <p className="font-bold">Fund Yourself</p>
              <p className="text-center">
                Your fans are available to help you.
              </p>
            </div>
            <div className="item space-y-3 flex flex-col items-center justify-center">
              <img
                className="rounded-full bg-slate-400 p-2"
                width={88}
                height={88}
                src='https://media2.giphy.com/media/6Mh8DXPL27UpNYp8o4/giphy.gif?cid=6c09b952c3n4u3jxyyiqlsvqs81vnk2qk92co9meqadax7al&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g'
                alt="Your Fans Want To Help"
              />
              <p className="font-bold">Your Fans Want To Help</p>
              <p className="text-center">
                Your fans are available to help you.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white h-1 opacity-20"></div>

        <div className="text-white container mx-auto py-32 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-center my-12">
            Learn More About Us
          </h2>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/wbj-DuaL748?si=w7qBOCy6u0lmBKmv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
    </>
  );
}
