import React from "react";
import Link from "next/link";
import { WEBSITE_HOME } from "@/routes/WebsiteRoute";
import {
  FaFileContract,
  FaShieldAlt,
  FaCreditCard,
  FaTruck,
  FaExchangeAlt,
  FaUserShield,
} from "react-icons/fa";
import { FaArrowUpLong } from "react-icons/fa6";

const TermsAndConditions = () => {
  const sections = [
    {
      id: "definitions",
      title: "1. Definitions & Interpretation",
      icon: <FaFileContract className="text-primary" size={28} />,
      content: (
        <>
          <p className="mb-4">
            <strong>"Website"</strong> refers to www.mumworld.in and all
            associated subdomains.
          </p>
          <p className="mb-4">
            <strong>"We/Us/Our"</strong> refers to Mumworld, a company
            registered in India.
          </p>
          <p className="mb-4">
            <strong>"You/Your"</strong> refers to the user or customer accessing
            the Website.
          </p>
          <p className="mb-4">
            <strong>"Products"</strong> refers to mom-care and baby-care
            products available for purchase on our Website.
          </p>
          <p className="mb-4">
            <strong>"Services"</strong> includes all services offered through
            the Website including but not limited to product sales, community
            forums, and informational content.
          </p>
        </>
      ),
    },
    {
      id: "agreement",
      title: "2. Agreement to Terms",
      icon: <FaFileContract className="text-primary" size={28} />,
      content: (
        <>
          <p className="mb-4">
            By accessing and using the Mumworld Website, you acknowledge that
            you have read, understood, and agree to be bound by these Terms and
            Conditions. If you do not agree with any part of these terms, you
            must not use our Website or Services.
          </p>
          <p className="mb-4">
            These Terms constitute a legally binding agreement between you and
            Mumworld regarding your use of the Website. We reserve the right to
            modify these Terms at any time without prior notice. Continued use
            of the Website after changes constitutes acceptance of the modified
            Terms.
          </p>
        </>
      ),
    },
    {
      id: "account",
      title: "3. User Accounts & Registration",
      icon: <FaUserShield className="text-primary" size={28} />,
      content: (
        <>
          <p className="mb-4">
            To access certain features of our Website, you may be required to
            create an account. You agree to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Provide accurate, current, and complete information during
              registration
            </li>
            <li>Maintain and promptly update your account information</li>
            <li>Maintain the confidentiality of your password and account</li>
            <li>
              Notify us immediately of any unauthorized use of your account
            </li>
            <li>
              Accept responsibility for all activities that occur under your
              account
            </li>
          </ul>
          <p className="mb-4">
            You must be at least 18 years old to create an account. We reserve
            the right to refuse service, terminate accounts, or remove content
            at our sole discretion.
          </p>
        </>
      ),
    },
    {
      id: "products",
      title: "4. Product Information & Pricing",
      icon: <FaCreditCard className="text-primary" size={28} />,
      content: (
        <>
          <p className="mb-4">
            <strong>Product Descriptions:</strong> We strive to provide accurate
            product descriptions and images. However, we do not guarantee that
            product descriptions, colors, or other content is accurate,
            complete, reliable, or error-free.
          </p>
          <p className="mb-4">
            <strong>Pricing:</strong> All prices are in Indian Rupees (₹) and
            include applicable taxes unless stated otherwise. We reserve the
            right to change prices at any time without notice. However, price
            changes will not affect orders already confirmed.
          </p>
          <p className="mb-4">
            <strong>Availability:</strong> All products are subject to
            availability. If a product is out of stock, we will notify you and
            either cancel the order or arrange for backorder as per your
            preference.
          </p>
          <p className="mb-4">
            <strong>Medical Disclaimer:</strong> Our products are for general
            wellness and care. They are not intended to diagnose, treat, cure,
            or prevent any disease. Always consult with a healthcare
            professional before using any new products, especially during
            pregnancy or while breastfeeding.
          </p>
        </>
      ),
    },
    {
      id: "orders",
      title: "5. Orders & Payment",
      icon: <FaCreditCard className="text-primary" size={28} />,
      content: (
        <>
          <p className="mb-4">
            <strong>Order Acceptance:</strong> Your order constitutes an offer
            to purchase. We reserve the right to accept or decline your order
            for any reason, including product availability, errors in product or
            pricing information, or suspected fraudulent activity.
          </p>
          <p className="mb-4">
            <strong>Payment Methods:</strong> We accept various payment methods
            including credit/debit cards, UPI, net banking, and wallets. All
            payments are processed through secure payment gateways.
          </p>
          <p className="mb-4">
            <strong>Order Confirmation:</strong> You will receive an email
            confirmation once your order is successfully placed. This email
            serves as proof of order but does not guarantee delivery until the
            order is shipped.
          </p>
        </>
      ),
    },
    {
      id: "shipping",
      title: "6. Shipping & Delivery",
      icon: <FaTruck className="text-primary" size={28} />,
      content: (
        <>
          <p className="mb-4">
            <strong>Delivery Areas:</strong> We currently ship across India.
            Delivery times may vary based on location and product availability.
          </p>
          <p className="mb-4">
            <strong>Shipping Charges:</strong> Shipping charges are calculated
            based on weight, destination, and shipping method. Free shipping may
            be available for orders above a certain value.
          </p>
          <p className="mb-4">
            <strong>Delivery Times:</strong> Estimated delivery times are
            provided at checkout. These are estimates only and we are not
            responsible for delays caused by carriers, weather, or other
            unforeseen circumstances.
          </p>
          <p className="mb-4">
            <strong>Risk of Loss:</strong> All products purchased from Mumworld
            are made pursuant to a shipment contract. The risk of loss and title
            for such products pass to you upon our delivery to the carrier.
          </p>
        </>
      ),
    },
    {
      id: "returns",
      title: "7. Returns, Refunds & Exchanges",
      icon: <FaExchangeAlt className="text-primary" size={28} />,
      content: (
        <>
          <p className="mb-4">
            <strong>Return Policy:</strong> We accept returns within 30 days of
            delivery for most products, provided they are in original condition
            with all tags and packaging intact. Some products may have different
            return policies as indicated on the product page.
          </p>
          <p className="mb-4">
            <strong>Non-Returnable Items:</strong> For health and hygiene
            reasons, certain personal care products, opened products, and
            products marked as "final sale" cannot be returned.
          </p>
          <p className="mb-4">
            <strong>Refund Process:</strong> Once we receive and inspect the
            returned item, we will process your refund within 7-10 business
            days. Refunds will be issued to the original payment method.
          </p>
          <p className="mb-4">
            <strong>Exchange Policy:</strong> Exchanges are subject to product
            availability. Contact our customer support team to initiate an
            exchange.
          </p>
        </>
      ),
    },
    {
      id: "intellectual",
      title: "8. Intellectual Property Rights",
      icon: <FaShieldAlt className="text-primary" size={28} />,
      content: (
        <>
          <p className="mb-4">
            All content on the Mumworld Website, including text, graphics,
            logos, images, audio clips, digital downloads, and software, is the
            property of Mumworld or its content suppliers and is protected by
            Indian and international copyright laws.
          </p>
          <p className="mb-4">
            The "Mumworld" name and logo are registered trademarks of Mumworld.
            You may not use our trademarks without prior written permission.
          </p>
          <p className="mb-4">
            You may not reproduce, distribute, modify, create derivative works
            of, publicly display, or commercially exploit any content from our
            Website without our express written permission.
          </p>
        </>
      ),
    },
    {
      id: "conduct",
      title: "9. User Conduct & Prohibited Activities",
      icon: <FaUserShield className="text-primary" size={28} />,
      content: (
        <>
          <p className="mb-4">You agree not to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Use the Website for any illegal purpose or in violation of any
              laws
            </li>
            <li>Harass, abuse, or harm another person</li>
            <li>Submit false or misleading information</li>
            <li>
              Attempt to gain unauthorized access to our systems or networks
            </li>
            <li>Interfere with the proper working of the Website</li>
            <li>
              Use any robot, spider, or other automated device to access the
              Website
            </li>
            <li>Collect or harvest any personally identifiable information</li>
            <li>
              Post or transmit any content that is harmful, threatening, or
              offensive
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "liability",
      title: "10. Limitation of Liability",
      icon: <FaShieldAlt className="text-primary" size={28} />,
      content: (
        <>
          <p className="mb-4">
            To the maximum extent permitted by law, Mumworld shall not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages resulting from:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Your use or inability to use the Website</li>
            <li>
              Any unauthorized access to or alteration of your transmissions or
              data
            </li>
            <li>Any conduct or content of any third party on the Website</li>
            <li>Any content obtained from the Website</li>
          </ul>
          <p className="mb-4">
            Our total liability to you for all claims arising from or related to
            the Website shall not exceed the amount you paid to us in the last
            six months for services related to the claim.
          </p>
        </>
      ),
    },
    {
      id: "indemnification",
      title: "11. Indemnification",
      icon: <FaShieldAlt className="text-primary" size={28} />,
      content: (
        <>
          <p className="mb-4">
            You agree to indemnify, defend, and hold harmless Mumworld and its
            officers, directors, employees, agents, and affiliates from and
            against any claims, liabilities, damages, losses, and expenses,
            including reasonable legal fees, arising out of or in any way
            connected with:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Your access to or use of the Website</li>
            <li>Your violation of these Terms</li>
            <li>
              Your violation of any third-party right, including intellectual
              property rights
            </li>
            <li>Any claim that your content caused damage to a third party</li>
          </ul>
        </>
      ),
    },
    {
      id: "termination",
      title: "12. Termination",
      icon: <FaFileContract className="text-primary" size={28} />,
      content: (
        <>
          <p className="mb-4">
            We may terminate or suspend your access to the Website immediately,
            without prior notice or liability, for any reason, including if you
            breach these Terms.
          </p>
          <p className="mb-4">
            Upon termination, your right to use the Website will cease
            immediately. If you wish to terminate your account, you may simply
            discontinue using the Website or contact us to delete your account.
          </p>
        </>
      ),
    },
    {
      id: "governing",
      title: "13. Governing Law & Dispute Resolution",
      icon: <FaFileContract className="text-primary" size={28} />,
      content: (
        <>
          <p className="mb-4">
            These Terms shall be governed by and construed in accordance with
            the laws of India, without regard to its conflict of law provisions.
          </p>
          <p className="mb-4">
            Any dispute arising from or relating to these Terms shall be subject
            to the exclusive jurisdiction of the courts located in Noida, Uttar
            Pradesh, India.
          </p>
          <p className="mb-4">
            We encourage you to contact us first to resolve any dispute amicably
            before resorting to legal proceedings.
          </p>
        </>
      ),
    },
    {
      id: "changes",
      title: "14. Changes to Terms",
      icon: <FaFileContract className="text-primary" size={28} />,
      content: (
        <>
          <p className="mb-4">
            We reserve the right to modify or replace these Terms at any time.
            If a revision is material, we will provide at least 30 days' notice
            prior to any new terms taking effect.
          </p>
          <p className="mb-4">
            By continuing to access or use our Website after those revisions
            become effective, you agree to be bound by the revised terms. If you
            do not agree to the new terms, you must stop using the Website.
          </p>
        </>
      ),
    },
    {
      id: "contact",
      title: "15. Contact Information",
      icon: <FaFileContract className="text-primary" size={28} />,
      content: (
        <>
          <p className="mb-4">
            If you have any questions about these Terms and Conditions, please
            contact us at:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="mb-2">
              <strong>Email:</strong> legal@mumworld.in
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> +91-8569874589
            </p>
            <p className="mb-2">
              <strong>Address:</strong> Mumworld Market, Noida, Uttar Pradesh
              201310, India
            </p>
            <p>
              <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00
              PM IST
            </p>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 lg:px-32 py-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>

          <p className="text-gray-500 mt-2">
            Please read these terms carefully before using our website
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-32 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4 text-gray-900">
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-gray-600 hover:text-primary hover:font-medium py-2 border-l-2 border-transparent hover:border-primary pl-3 transition-all"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
              <div className="mt-8 pt-6 border-t">
                <Link
                  href={WEBSITE_HOME}
                  className="border-2 border-primary text-primary justify-center py-2 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors items-center flex gap-2"
                >
                  <FaArrowUpLong size={18} />
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Important Notice */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                <div className="flex items-start gap-3">
                  <FaShieldAlt className="text-blue-500 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      Important Notice
                    </h3>
                    <p className="text-gray-700">
                      These Terms and Conditions govern your use of Mumworld. By
                      accessing our website, you agree to be bound by these
                      terms. If you disagree with any part, please discontinue
                      use immediately.
                    </p>
                  </div>
                </div>
              </div>

              {/* Terms Sections */}
              <div className="space-y-6">
                {sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {section.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {section.title}
                      </h2>
                    </div>
                    <div className="prose prose-lg max-w-none text-gray-700 mb-4">
                      {section.content}
                    </div>
                    <div className="">
                      <Link
                        href="#top"
                        className="border-2 border-primary text-primary px-3 py-2 max-w-[142px] rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors flex gap-2 items-center "
                      >
                        <FaArrowUpLong size={18} />
                        <span>Back to top</span>
                      </Link>
                    </div>
                  </section>
                ))}
              </div>

              {/* Acceptance Section */}
              <div className="mt-12 pt-8 border-t">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-4 text-gray-900">
                    Acceptance of Terms
                  </h3>
                  <p className="text-gray-700 mb-4">
                    By placing an order or creating an account on Mumworld, you
                    acknowledge that you have read, understood, and agree to be
                    bound by these Terms and Conditions.
                  </p>
                  <p className="text-gray-700">
                    If you have any questions about these terms, please contact
                    our legal department before using our services.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <Link
                href="/privacy-policy"
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  Privacy Policy
                </h3>
                <p className="text-gray-600 text-sm">
                  Learn how we collect, use, and protect your personal
                  information
                </p>
              </Link>
              <Link
                href="/shipping-policy"
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  Shipping Policy
                </h3>
                <p className="text-gray-600 text-sm">
                  Details about delivery times, shipping charges, and tracking
                </p>
              </Link>
              <Link
                href="/return-policy"
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  Return Policy
                </h3>
                <p className="text-gray-600 text-sm">
                  Information about returns, refunds, and exchanges
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
