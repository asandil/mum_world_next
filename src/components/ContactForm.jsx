"use client";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Phone: ${formData.phone}\n\nMessage: ${formData.message}`,
          subject: `Contact form submission from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" min-w-[387px]">
      <h4 className="text-center md:text-start text-[22px] text-[rgb(27,27,27)] leading-[1.25] mb-[24px] font-[400]">
        Send Message
      </h4>

      {submitStatus && (
        <div
          className={`mb-[24px] p-[16px] rounded-md ${
            submitStatus.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

     

      <form onSubmit={handleSubmit} >
        <div className="pb-[24px]">
          <input
            className="py-[15.5px] px-[16px] text-[rgb(94,94,94)] border-[1px] border-[rgb(226,226,226)] w-[100%] font-[400] text-[16px] focus:outline-none focus:border focus:border-current"
            name="name"
            type="text"
            placeholder="Name*"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="pb-[24px]">
          <input
            className="py-[15.5px] px-[16px] text-[rgb(94,94,94)] border-[1px] border-[rgb(226,226,226)] w-[100%] font-[400] text-[16px] focus:outline-none focus:border focus:border-current"
            name="email"
            type="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="pb-[24px]">
          <input
            className="py-[15.5px] px-[16px] text-[rgb(94,94,94)] border-[1px] border-[rgb(226,226,226)] w-[100%] font-[400] text-[16px] focus:outline-none focus:border focus:border-current"
            name="phone"
            type="text"
            placeholder="Phone*"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="pb-[24px]">
          <textarea
            className="p-[16px] text-[rgb(94,94,94)] border-[1px] border-[rgb(226,226,226)] w-[100%] font-[400] text-[16px] focus:outline-none focus:border focus:border-current"
            name="message"
            rows={4}
            placeholder="How Can We Help You?"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="pb-[24px]">
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
                    border-top: 2px solid #FFEB3B;
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
                    border-bottom: 2px solid #FFEB3B;
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
             "SEND"
             )}
          </button>
        </div>
      </form>
    </div>
  );
}
