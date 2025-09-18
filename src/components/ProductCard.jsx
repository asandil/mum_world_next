// components/ProductCard.js
const ProductCard = ({ product, onViewDetails, onAddToCart }) => {
  const limitWords = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div
       onClick={() => onViewDetails(product)}
        className="h-48 cursor-pointer bg-no-repeat bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage: product.image
            ? `url(${product.image})`
            : "url(/background-image-contact-us.png)",
        }}
      >
        {/* Semi-transparent overlay to ensure content is readable */}
        <div className="absolute inset-0 bg-black opacity-30"></div>

        <div className="text-center relative z-10 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-white font-medium text-lg">
            Digital Download
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3
          onClick={() => onViewDetails(product)}
          className="text-xl font-bold text-gray-800 mb-2 hover:text-gray-600 cursor-pointer "
        >
          {/* {product.title} */}
          {limitWords(product.title, 5)}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center mb-4">
          <span className="text-2xl font-bold text-[#F69E87]">
            {product.price.currency}
            {product.price.current}
          </span>
          <span className="ml-2 text-gray-500 line-through">
            {product.price.currency}
            {product.price.regular}
          </span>
        </div>

        <div className="flex space-x-3 ">
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 bg-white border border-[#F69E87] text-[#F69E87] hover:bg-pink-50 font-medium py-2 px-4 rounded-lg cursor-pointer"
          >
            View Details
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-[#F69E87] hover:bg-[#e6846a] text-white cursor-pointer font-medium py-2 px-4 rounded-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; // Make sure you have this export
