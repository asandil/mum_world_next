"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const CheckoutSuccessPage = () => {
  const router = useRouter()

  const handleContinueShopping = () => {
    router.push('/shop')
  }

  const handleViewOrders = () => {
    router.push('/my-account')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            {/* Success Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-10 h-10 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Order Placed Successfully!
            </h1>
            
            <p className="text-gray-600 mb-8">
              Thank you for your order. We've received your order and will begin processing it right away.
              You'll receive an email confirmation shortly with your order details.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">What's Next?</h2>
              <div className="text-left space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#F69E87] text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Order Confirmation</p>
                    <p className="text-sm text-gray-600">You'll receive an email with your order details and tracking information.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#F69E87] text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Order Processing</p>
                    <p className="text-sm text-gray-600">We'll prepare your items for shipment within 1-2 business days.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#F69E87] text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Delivery</p>
                    <p className="text-sm text-gray-600">Your order will be delivered to your specified address.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleContinueShopping}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium"
              >
                Continue Shopping
              </button>
              <button
                onClick={handleViewOrders}
                className="flex-1 bg-[#F69E87] hover:bg-[#e6846a] text-white py- rounded-lg font-medium"
              >
                View My Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccessPage
