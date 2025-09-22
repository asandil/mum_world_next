import Image from "next/image";

const CartSidebar = ({ cart, isOpen, onClose, onCheckout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[url('/background-image-contact-us.png')] bg-no-repeat bg-cover opacity-50 h-[100vh] bg-opacity-10"
        onClick={onClose}
      ></div>
      <div className="relative bg-white w-80 max-w-full h-full ml-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 cursor-pointer hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div>
            {cart.map((item, index) => (
              <div key={index} className="border-b py-4">
                <h3 className="font-medium">{item.title}</h3>
                <Image src={item.image} alt={item.title} width={200} height={200} />
                <p className="text-[#F69E87] font-bold">
                  {item.price.currency}
                  {item.price.current}
                </p>
              </div>
            ))}
            <div className="mt-6">
              <button
                onClick={onCheckout}
                className="w-full bg-[#F69E87] hover:bg-[#e6846a] cursor-pointer text-white py-2 rounded-lg font-medium"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
