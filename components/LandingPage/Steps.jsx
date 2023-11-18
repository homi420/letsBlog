import React from "react";
import { FaPen, FaGoogle, FaPaperPlane } from "react-icons/fa";
const Steps = () => {
  return (
    <section className="p-4 my-48">
      <h1 className="my-20 stepsHeading">"Just Three Steps To Follow"</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3  3xs:grid-cols-1 gap-6">
        <div className="bg-gunmetal dark:bg-ghost-white rounded-full text-center flex flex-col justify-center items-center p-4 shadow-black shadow-md dark:shadow-celestial-blue">
          {/* <h4 className="text-center text-3xl my-2">Step 1</h4> */}
          <FaGoogle className="text-center my-2 text-4xl text-celestial-blue" />
          <p className="text-center my-2 text-3xl text-ghost-white dark:text-gunmetal">
            Sign In With <br />
            Google
          </p>
        </div>
        <div className="bg-gunmetal dark:bg-ghost-white rounded-full text-center flex flex-col justify-center items-center p-4 shadow-black shadow-md dark:shadow-celestial-blue">
          {/* <h4 className="text-center text-3xl my-2">Step 1</h4> */}
          <FaPen className="text-center my-2 text-4xl text-celestial-blue" />
          <p className="text-center my-2 text-3xl text-ghost-white dark:text-gunmetal">
            Write A Blog
          </p>
        </div>
        <div className="bg-gunmetal dark:bg-ghost-white rounded-full text-center flex flex-col justify-center items-center p-4 shadow-black shadow-md dark:shadow-celestial-blue">
          {/* <h4 className="text-center text-3xl my-2">Step 1</h4> */}
          <FaPaperPlane className="text-center my-2 text-4xl text-celestial-blue" />
          <p className="text-center my-2 text-3xl text-ghost-white dark:text-gunmetal">
            Post It
          </p>
        </div>
      </div>
    </section>
  );
};

export default Steps;
