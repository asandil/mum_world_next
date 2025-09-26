"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [pdfError, setPdfError] = useState(null);
  const [loadingPdf, setLoadingPdf] = useState(false);

  const fetchOrders = useCallback(() => {
    try {
      const savedOrders = localStorage.getItem("orders");
      if (!savedOrders) return;

      const parsedOrders = JSON.parse(savedOrders);
      const filteredOrders = parsedOrders.filter(
        (order) => order.pdfUrl && typeof order.pdfUrl === "string"
      );

      setOrders(filteredOrders);
    } catch (error) {
      console.error("Error loading orders:", error);
      setOrders([]);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // PDF mapping configuration
  const pdfMapping = {
    "trimester-by-trimester-pregnancy-guide":"/pdfs/trimester-by-trimester-pregnancy-guide-overseas-moms-edition.pdf",
    "product-1": "/pdfs/product1-receipt.pdf",
    "product-2": "/pdfs/product2-receipt.pdf",
    // Add more mappings as needed
  };

const handlePdfSelect = useCallback(async (pdfPath) => {
  try {
    // Check if pdfPath is defined and valid
    if (!pdfPath || typeof pdfPath !== 'string') {
      console.error('Invalid PDF path:', pdfPath);
      return;
    }

    // Ensure pdfPath starts with a slash
    const normalizedPdfPath = pdfPath.startsWith('/') ? pdfPath : `/${pdfPath}`;
    const fullPdfUrl = `${window.location.origin}${normalizedPdfPath}`;
    
    console.log('Fetching PDF from:', fullPdfUrl); // Debug log

    // Check if PDF exists
    const response = await fetch(fullPdfUrl, { method: "HEAD" });

    if (response.ok) {
      window.open(fullPdfUrl, "_blank", "noopener,noreferrer");
    } else {
      console.error('PDF not found:', response.status);
      // Handle error - show message to user
      alert('PDF not found. Please try again.');
    }
  } catch (error) {
    console.error('Error opening PDF:', error);
    // Handle error - show message to user
    alert('Error opening PDF. Please try again.');
  }
}, []);

  const ordersGrid = useMemo(() => {
    if (orders.length === 0) {
      return <p className="text-center text-gray-600 py-8">No orders yet.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((product, index) => (
          <OrderCard
            key={`${product.title}-${index}`}
            product={product}
            onSelectPdf={handlePdfSelect}
            disabled={loadingPdf}
          />
        ))}
      </div>
    );
  }, [orders, handlePdfSelect, loadingPdf]);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Orders</h1>

      {loadingPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg">Loading PDF...</p>
          </div>
        </div>
      )}

      {pdfError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {pdfError}
        </div>
      )}

      {ordersGrid}
    </div>
  );
}

const OrderCard = React.memo(({ product, onSelectPdf, disabled }) => {
  const handleClick = useCallback(() => {
    if (!disabled) {
      onSelectPdf(product.pdfUrl);
    }
  }, [onSelectPdf, product.pdfUrl, disabled]);

  return (
    <div
      className={`border rounded p-4 shadow cursor-pointer transition transform hover:scale-105 ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && !disabled && handleClick()}
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover mb-4 rounded"
        loading="lazy"
      />
      <h2 className="text-xl font-semibold mb-2 line-clamp-2">
        {product.title}
      </h2>
      <p className="text-gray-700 mb-2 line-clamp-3">{product.description}</p>
      <p className="font-bold">
        {product.price.currency}
        {product.price.current}
      </p>
      <div className="mt-3 flex items-center text-blue-600">
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm font-medium">View PDF</span>
      </div>
    </div>
  );
});

OrderCard.displayName = "OrderCard";
