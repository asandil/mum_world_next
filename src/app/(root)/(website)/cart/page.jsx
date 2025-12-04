"use client"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartSidebar from '@/components/CartSidebar'
import { increaseQuantity, decreaseQuantity, removeFromCart, removeItemByIndex } from '@/store/reducer/cartReducer'

const CartPage = () => {
  const cart = useSelector((state) => state.cartStore?.products || [])
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = React.useState(true) // Always open on cart page

  const handleClose = () => {
    // Optionally redirect to home or previous page
    window.history.back()
  }

  const handleCheckout = () => {
    console.log('Proceeding to checkout')
    // Implement checkout logic here
  }

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseQuantity({
      productId: item.productId,
      variantId: item.variantId
    }))
  }

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity({
      productId: item.productId,
      variantId: item.variantId
    }))
  }

  const handleRemoveItem = (item, index) => {
    // Remove item by index - this is more reliable
    dispatch(removeItemByIndex({ index }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="mt-4 bg-[#F69E87] hover:bg-[#e6846a] text-white px-6 py-2 rounded-lg"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {cart.map((item, index) => (
                <div key={index} className={`${index < cart.length - 1 ? 'border-b' : ''} py-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-20 h-20 object-cover rounded"
                        />
                      )}
                      <div>
                        <h3 className="font-medium text-lg">{item.title}</h3>
                        <p className="text-[#F69E87] font-bold">
                          {item.sellingPrice?.currency || '₹'}
                          {item.sellingPrice?.current || item.sellingPrice || '0.00'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item, index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">Quantity:</span>
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => handleDecreaseQuantity(item)}
                          className={`px-3 py-1 border-r ${
                            item.qty <= 1
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                          disabled={item.qty <= 1}
                        >
                          -
                        </button>
                        <span className="px-4 py-1 text-center">
                          {item.qty || 1}
                        </span>
                        <button
                          onClick={() => handleIncreaseQuantity(item)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 border-l"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Subtotal:</p>
                      <p className="text-[#F69E87] font-bold text-lg">
                        {item.sellingPrice?.currency || '₹'}
                        {((item.sellingPrice?.current || item.sellingPrice|| 0) * (item.qty || 1)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-semibold">Total:</span>
                  <span className="text-xl font-bold text-[#F69E87]">
                    ₹{cart.reduce((total, item) => {
                      const price = item.sellingPrice?.current || item.sellingPrice || 0
                      const qty = item.qty || 1
                      return total + (price * qty)
                    }, 0).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#F69E87] hover:bg-[#e6846a] text-white py-3 rounded-lg font-medium text-lg"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage