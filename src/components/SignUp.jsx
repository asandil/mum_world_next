import React from "react";

const SignUp = () => {
  return (
    <div>
      <h4 className="text-[22px] font-[400] leading-[1.25] text-[rgb(27,27,27)] mb-[8px]">
        Sign up for blog updates!
      </h4>
      <p className="mb-[16px] text-[14px] leading-[1.5] font-[400]">
        Join my email list to receive updates and information.
      </p>
      <form action="" className="w-[100%] md:w-[50%] lg:w-[100%] mb-[56px]">
        <input
          className="p-[16px] bg-transparent text-[rgb(94,94,94)] border-[1px] border-[rgb(226,226,226)] font-[400] text-[16px] focus:outline-none focus:border focus:border-current w-[100%]"
          id="Email"
          type="email"
          placeholder="Email Address"
        />
        <button className="font-[700] min-h-[56px] w-[100%] bg-[rgb(250,182,107)] text-black cursor-pointer text-[14px] hover:bg-[rgb(250,204,164)] transition-all duration-300 ease-in-out delay-0 mt-[16px]">
          SIGN UP
        </button>
      </form>
    </div>
  );
};

export default SignUp;
