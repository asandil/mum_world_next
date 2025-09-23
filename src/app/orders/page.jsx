"use client";
import React, { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);

useEffect(() => {
  const savedOrders = localStorage.getItem("orders");
  if (savedOrders) {
    const parsedOrders = JSON.parse(savedOrders);
    console.log("Saved orders:", parsedOrders);
    
    // Check PDF URLs
    parsedOrders.forEach((order, index) => {
      console.log(`Order ${index} PDF:`, order.pdfUrl);
      console.log(`Full URL:`, `${window.location.origin}${order.pdfUrl}`);
    });
    
    const filteredOrders = parsedOrders.filter((item) => item.pdfUrl);
    setOrders(filteredOrders);
  }
}, []);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Orders</h1>

      {orders.length === 0 && (
        <p className="text-center text-gray-600">No orders yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((product, index) => (
          <div
            key={index}
            className="border rounded p-4 shadow cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedPdf(product.pdfUrl)}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="font-bold">
              {product.price.currency}
              {product.price.current}
            </p>
          </div>
        ))}
      </div>

     
    </div>
  );
}
