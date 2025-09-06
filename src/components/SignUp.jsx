"use client";
import React, { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Thank you for subscribing! Please check your email for confirmation.' 
        });
        setEmail('');
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: result.error || 'Failed to subscribe. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error submitting subscription:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Network error. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h4 className="text-[22px] font-[400] leading-[1.25] text-[rgb(27,27,27)] mb-[8px]">
        Sign up for blog updates!
      </h4>
      <p className="mb-[16px] text-[14px] leading-[1.5] font-[400]">
        Join my email list to receive updates and information.
      </p>
      
      {submitStatus && (
        <div className={`mb-[16px] p-[12px] rounded-md text-sm ${
          submitStatus.type === 'success' 
            ? 'bg-green-100 text-green-700 border border-green-300' 
            : 'bg-red-100 text-red-700 border border-red-300'
        }`}>
          {submitStatus.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="w-[100%] md:w-[50%] lg:w-[100%] mb-[56px]">
        <input
          className="p-[16px] bg-transparent text-black border-[1px] border-[rgb(226,226,226)] font-[400] text-[16px] focus:outline-none focus:border focus:border-current w-[100%]"
          id="signupEmail"
          name="email"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button 
          type="submit"
          disabled={isSubmitting}
          className="font-[700] min-h-[56px] w-[100%] bg-[#F69E87] text-[#fff] cursor-pointer text-[14px] hover:bg-[#e6846a] transition-all duration-300 ease-in-out delay-0 mt-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
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
      </form>
    </div>
  );
};

export default SignUp;
