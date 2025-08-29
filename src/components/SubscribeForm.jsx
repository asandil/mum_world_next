"use client";
import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "Thank you for subscribing! Please check your email for confirmation.",
        });
        setEmail("");
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to subscribe. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting subscription:", error);
      setSubmitStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {submitStatus && (
        <div
          className={`mb-[16px] p-[16px] rounded-md text-center ${
            submitStatus.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Form */}
      <form
        className="md:flex gap-5 md:justify-between"
        onSubmit={handleSubmit}
      >
        <div className="relative pb-[24px] group w-[100%]">
          <input
            className="py-[15.5px] px-[16px] bg-transparent text-[rgb(94,94,94)] border-[1px] border-[rgb(226,226,226)] font-[400] text-[16px] focus:outline-none focus:border focus:border-current w-[100%] placeholder-[rgb(158,108,52)]"
            id="subscribeEmail"
            name="email"
            type="email"
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* <label
            className="text-[rgb(71,71,71)] font-[400] absolute left-[16px] top-[24%] group-focus-within:text-[rgb(158,108,52)] group-focus-within:top-[8px] group-focus-within:text-[12px] transition-all duration-150 ease-in-out delay-0"
            htmlFor="subscribeEmail"
          >
            Email
          </label> */}
        </div>

        <div className="pb-[24px] md:w-[30%]">
          <button
            type="submit"
            disabled={isSubmitting}
            className="font-[700] min-h-[56px] w-[100%] bg-[rgb(250,182,107)] text-black cursor-pointer text-[14px] hover:bg-[rgb(250,204,164)] transition-all duration-300 ease-in-out delay-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center text-white">
                <div className="loader mr-[10px]"></div>
                <style jsx>{`
                  .loader {
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    display: inline-block;
                    border-top: 2px solid #ffeb3b;
                    border-right: 2px solid transparent;
                    box-sizing: border-box;
                    animation: rotation 1s linear infinite;
                    position: relative;
                  }
                  .loader::after {
                    content: "";
                    box-sizing: border-box;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    border-bottom: 2px solid #ffeb3b;
                    border-left: 2px solid transparent;
                  }
                  @keyframes rotation {
                    0% {
                      transform: rotate(0deg);
                    }
                    100% {
                      transform: rotate(360deg);
                    }
                  }
                `}</style>
                Sending...
              </div>
            ) : (
              "SIGN UP"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
