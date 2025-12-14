import React from 'react'
import { BsCart2 } from "react-icons/bs";
import { useSelector } from "react-redux";

const Cart = ({ onToggle }) => {
  const cartCount = useSelector((state) => {
    console.log('Cart state:', state.cartStore);
    return state.cartStore?.count || 0;
  });
  const cartItems = useSelector((state) => state.cartStore?.products || []);

  return (
    <button 
      type="button" 
      onClick={onToggle}
      className="relative p-2"
    >
      <BsCart2 className="text-gray-500 hover:text-[#e6846a] cursor-pointer" size={25} />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#F69E87] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </button>
  )
}

export default Cart;