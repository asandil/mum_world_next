"use client";
// components/PrintButton.jsx
import React from "react";
import { ButtonLoading } from "../ButtonLoading";

const PrintButton = ({ orderData, variant = "default", className = "" }) => {
  // Format currency function for consistent formatting
  const formatCurrency = (amount) => {
    return (
      amount?.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
      }) || "₹0"
    );
  };

  const handlePrint = () => {
    if (!orderData?.data) {
      console.error("No order data available for printing");
      return;
    }

    const printWindow = window.open("", "_blank", "width=900,height=600");

    // Get order data for easier access
    const order = orderData.data;

    // Generate products HTML
    const productsHtml =
      order.products
        ?.map(
          (product) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">
          <strong>${product?.productId?.name || "N/A"}</strong><br/>
          ${
            product?.variantId?.color
              ? `Color: ${product.variantId.color}<br/>`
              : ""
          }
          ${product?.variantId?.size ? `Size: ${product.variantId.size}` : ""}
        </td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">
          ${formatCurrency(product?.sellingPrice || 0)}
        </td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">
          ${product?.qty || 1}
        </td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">
          ${formatCurrency((product?.sellingPrice || 0) * (product?.qty || 1))}
        </td>
      </tr>
    `
        )
        .join("") ||
      '<tr><td colspan="4" style="text-align: center;">No products found</td></tr>';

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Mumworld.in Order Invoice - ${order.order_id}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              padding: 20px;
              background-color: #f8f9fa;
            }
            
            .invoice-container {
              max-width: 900px;
              margin: 0 auto;
              background: white;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            
            .header {
              text-align: center;
              padding-bottom: 20px;
            }
            
            .header h1 {
              color: #2c3e50;
              margin-bottom: 10px;
              font-size: 28px;
            }
            
            .header p {
              color: #7f8c8d;
              margin: 5px 0;
            }
            
            .section {
              margin-bottom: 25px;
            }
            
            .section h3 {
              color: #F69E87;
              margin-bottom: 15px;
              padding-bottom: 8px;
              border-bottom: 1px solid #ecf0f1;
              font-size: 20px;
            }
            
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            
            th {
              background-color: #f8f9fa;
              color: #2c3e50;
              font-weight: 600;
              padding: 12px 8px;
              border: 1px solid #dee2e6;
              text-align: left;
            }
            
            td {
              padding: 10px 8px;
              border: 1px solid #dee2e6;
            }
            
            .total-section {
              background-color: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              border: 1px solid #e9ecef;
            }
            
            .total-section h3 {
              color: #27ae60;
            }
            
            .total-section tr:last-child {
              font-weight: bold;
              font-size: 18px;
              color: #2c3e50;
            }
            
            .print-date {
              text-align: right;
              color: #7f8c8d;
              font-size: 14px;
              margin-bottom: 20px;
            }
            
            .flex-container {
              display: flex;
              gap: 30px;
              margin-bottom: 30px;
            }
            
            @media print {
              body {
                padding: 0;
                background: white;
              }
              
              .invoice-container {
                box-shadow: none;
                padding: 10px;
              }
              
              .no-print {
                display: none !important;
              }
            }
            
            @media (max-width: 768px) {
              .flex-container {
                flex-direction: column;
              }
              
              .invoice-container {
                padding: 15px;
              }
            }
            
            .action-buttons {
              display: flex;
              justify-content: center;
              gap: 15px;
              margin-top: 30px;
            }
            
            .action-buttons button {
              padding: 12px 25px;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              font-size: 16px;
              font-weight: 500;
              transition: all 0.3s ease;
            }
            
            .print-btn {
              background-color: #3498db;
              color: white;
            }
            
            .print-btn:hover {
              background-color: #2980b9;
            }
            
            .close-btn {
              background-color: #95a5a6;
              color: white;
            }
            
            .close-btn:hover {
              background-color: #7f8c8d;
            }
            
            .status-badge {
              display: inline-block;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 14px;
              font-weight: 500;
              margin-left: 10px;
            }
            
            .status-paid {
              background-color: #d4edda;
              color: #155724;
            }
            
            .status-pending {
              background-color: #fff3cd;
              color: #856404;
            }
            
            .status-failed {
              background-color: #f8d7da;
              color: #721c24;
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="print-date">
              <strong>Printed on:</strong> ${new Date().toLocaleDateString(
                "en-IN",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </div>
            
            <div class="header">
              <div style="max-width: 260px">
                <img
                  alt="Logo"
                  height="auto"
                  src="https://res.cloudinary.com/dc0wr8hev/image/upload/v1766166906/lcsvrxwp43tsqaep2feu.png"
                  style="display: block; height: auto; border: 0; width: 100%"
                  title="Logo"
                  width="200"
                />
              </div>
            </div>
            
            <div class="section">
              <h3>Order Information</h3>
              <table>
                <tr>
                  <td style="width: 30%;"><strong>Order ID:</strong></td>
                  <td>${order.order_id}</td>
                </tr>
                <tr>
                  <td><strong>Transaction ID:</strong></td>
                  <td>${order.payment_id || "N/A"}</td>
                </tr>
                <tr>
                  <td><strong>Order Date:</strong></td>
                  <td>
                    <span >
                      ${new Date(orderData?.data?.createdAt || new Date()).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td><strong>Status:</strong></td>
                  <td>
                    <span class="status-badge status-${order.status.toLowerCase()}">
                      ${order.status}
                    </span>
                  </td>
                </tr>
              </table>
            </div>
            
            <div class="section">
              <h3>Ordered Products</h3>
              <table>
                <thead>
                  <tr>
                    <th style="width: 40%;">Product</th>
                    <th style="text-align: center;">Price</th>
                    <th style="text-align: center;">Quantity</th>
                    <th style="text-align: center;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${productsHtml}
                </tbody>
              </table>
            </div>
            
            <div class="flex-container">
              <div class="section" style="flex: 1;">
                <h3>Shipping Address</h3>
                <table>
                  <tr><td><strong>Name:</strong></td><td>${order.name}</td></tr>
                  <tr><td><strong>Email:</strong></td><td>${
                    order.email
                  }</td></tr>
                  <tr><td><strong>Phone:</strong></td><td>${
                    order.phone
                  }</td></tr>
                  <tr><td><strong>Address:</strong></td><td>${
                    order.address
                  }</td></tr>
                  <tr><td><strong>Street:</strong></td><td>${
                    order.street || "---"
                  }</td></tr>
                  <tr><td><strong>City:</strong></td><td>${order.city}</td></tr>
                  <tr><td><strong>State:</strong></td><td>${
                    order.state
                  }</td></tr>
                  <tr><td><strong>Country:</strong></td><td>${
                    order.country
                  }</td></tr>
                  <tr><td><strong>Pincode:</strong></td><td>${
                    order.pincode
                  }</td></tr>
                  <tr><td><strong>Landmark:</strong></td><td>${
                    order.landmark || "---"
                  }</td></tr>
                  ${
                    order.ordernote
                      ? `<tr><td><strong>Order Note:</strong></td><td>${order.ordernote}</td></tr>`
                      : ""
                  }
                </table>
              </div>
              <div class="section total-section" style="flex: 1;">
                <h3>Order Summary</h3>
                <table>
                  <tr><td><strong>Subtotal:</strong></td><td>${formatCurrency(
                    order.subtotal
                  )}</td></tr>
                  <tr><td><strong>Discount:</strong></td><td>${formatCurrency(
                    order.discount
                  )}</td></tr>
                  <tr><td><strong>Coupon Discount:</strong></td><td>${formatCurrency(
                    order.couponDiscountAmount
                  )}</td></tr>
                  <tr><td><strong style="font-size: 18px;">Total Amount:</strong></td>
                      <td><strong style="font-size: 18px; color: #27ae60;">${formatCurrency(
                        order.totalAmount
                      )}</strong></td></tr>
                </table>
              </div>
            </div>
            
            <div class="no-print action-buttons">
              <button onclick="window.print()" class="print-btn">
                🖨️ Print Invoice
              </button>
              <button onclick="window.close()" class="close-btn">
                ✕ Close Window
              </button>
            </div>
            
            <div style="text-align: center; margin-top: 30px; color: #7f8c8d; font-size: 14px; border-top: 1px solid #ecf0f1; padding-top: 20px;">
              <p>Thank you for your purchase! For any queries, please contact our customer support.</p>
              <p>This is a computer-generated invoice. No signature required.</p>
            </div>
          </div>
          
          <script>
            // Auto focus and potentially auto-print
            window.onload = function() {
              // Optional: Auto-print (uncomment if needed)
              // setTimeout(() => window.print(), 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <ButtonLoading
      type="button"
      text="Print Invoice"
      variant={variant}
      className={`cursor-pointer ${className}`}
      onClick={handlePrint}
      disabled={!orderData?.data}
    />
  );
};

export default PrintButton;
