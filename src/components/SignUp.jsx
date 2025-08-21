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
          className="p-[16px] bg-transparent text-[rgb(94,94,94)] border-[1px] border-[rgb(226,226,226)] font-[400] text-[16px] focus:outline-none focus:border focus:border-current w-[100%]"
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
          className="font-[700] min-h-[56px] w-[100%] bg-[rgb(250,182,107)] text-black cursor-pointer text-[14px] hover:bg-[rgb(250,204,164)] transition-all duration-300 ease-in-out delay-0 mt-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'SIGNING UP...' : 'SIGN UP'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
