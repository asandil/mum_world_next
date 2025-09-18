const ProductModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[url('/background-image-contact-us.png')] bg-no-repeat bg-cover opacity-50 h-[100vh] "
        onClick={onClose}
      ></div>
      <div className="relative shadow-2xl bg-white max-w-4xl mx-auto my-10 p-6 rounded-lg">
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-700"
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
        <h2 className="text-2xl font-bold text-[#F69E87] mb-4">
          {product.title}
        </h2>
        <p className="text-gray-700 mb-6">{product.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">What's Inside</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-[#F69E87]">First Trimester</h4>
                <ul className="list-disc list-inside ml-4 text-gray-700">
                  {product.what_Inside.first_trimester.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-[#F69E87]">Second Trimester</h4>
                <ul className="list-disc list-inside ml-4 text-gray-700">
                  {product.what_Inside.second_trimester.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-[#F69E87]">Third Trimester</h4>
                <ul className="list-disc list-inside ml-4 text-gray-700">
                  {product.what_Inside.third_trimester.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Bonus Content</h3>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              {Object.values(product.bonus_Section).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">
                Why Choose This Guide?
              </h3>
              <ul className="list-disc list-inside ml-4 text-gray-700">
                {product.why_Buy_This_Guide.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 ">
              <div>
                <span className="text-2xl font-bold text-[#F69E87]">
                  {product.price.currency}
                  {product.price.current}
                </span>
                <span className="ml-2 text-gray-500 line-through">
                  {product.price.currency}
                  {product.price.regular}
                </span>
              </div>
              <button
                onClick={() => onAddToCart(product)}
                className="bg-[#F69E87] mt-[20px] cursor-pointer hover:bg-[#e6846a] text-white font-medium py-2 px-6 rounded-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;