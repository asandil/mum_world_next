export const adminOrderNotification = (data) => {
  const html = `
<!DOCTYPE html>
<html
  lang="en-US"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:v="urn:schemas-microsoft-com:vml"
>
  <head>
    <title>📦 New Order Received - Admin Notification</title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        font-family: Arial, sans-serif;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }

      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }

      p {
        line-height: 1.6;
        margin: 0 0 10px 0;
      }

      .desktop_hide,
      .desktop_hide table {
        mso-hide: all;
        display: none;
        max-height: 0px;
        overflow: hidden;
      }

      .image_block img + div {
        display: none;
      }

      sup,
      sub {
        font-size: 75%;
        line-height: 0;
      }

      /* Admin Specific Colors */
      .admin-alert {
        color: #d9534f !important;
      }
      
      .admin-info {
        color: #5bc0de !important;
      }
      
      .admin-success {
        color: #5cb85c !important;
      }
      
      .admin-warning {
        color: #f0ad4e !important;
      }
      
      .admin-primary {
        color: #F69E87 !important;
      }
      
      .admin-bg-dark {
        background-color: #2c3e50 !important;
      }
      
      .admin-bg-alert {
        background-color: #f2dede !important;
      }
      
      .admin-bg-info {
        background-color: #d9edf7 !important;
      }

      @media (max-width: 700px) {
        .desktop_hide table.icons-inner,
        .social_block.desktop_hide .social-table {
          display: inline-block !important;
        }

        .icons-inner {
          text-align: center;
        }

        .icons-inner td {
          margin: 0 auto;
        }

        .mobile_hide {
          display: none;
        }

        .row-content {
          width: 100% !important;
        }

        .stack .column {
          width: 100%;
          display: block;
        }

        .mobile_hide {
          min-height: 0;
          max-height: 0;
          max-width: 0;
          overflow: hidden;
          font-size: 0px;
        }

        .desktop_hide,
        .desktop_hide table {
          display: table !important;
          max-height: none !important;
        }
      }

      /* Admin Specific Styles */
      .priority-badge {
        background-color: #d9534f;
        color: white;
        padding: 4px 10px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        display: inline-block;
      }
      
      .new-order-badge {
        background-color: #F69E87;
        color: white;
        padding: 8px 15px;
        border-radius: 4px;
        font-size: 16px;
        font-weight: bold;
        display: inline-block;
        margin-bottom: 20px;
      }
      
      .section-title {
        color: #2c3e50;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 15px;
        padding-bottom: 8px;
        border-bottom: 1px solid #e6e6e6;
      }
      
      .order-details-table {
        width: 100%;
        border-collapse: collapse;
      }
      
      .order-details-table tr {
        border-bottom: 1px solid #e6e6e6;
      }
      
      .order-details-table td {
        padding: 10px 0;
      }
      
      .order-details-table .label {
        color: #666;
        width: 40%;
        font-weight: 600;
      }
      
      .order-details-table .value {
        color: #2c3e50;
        font-weight: bold;
        text-align: right;
      }
      
      .total-row {
        font-weight: bold;
        font-size: 18px;
        border-top: 2px solid #ddd !important;
        margin-top: 10px;
      }
      
      .product-image {
        border-radius: 4px;
        border: 1px solid #e6e6e6;
        max-width: 80px;
        height: auto;
      }
      
      .admin-alert-section {
        background-color: #f2dede;
        border-left: 4px solid #d9534f;
        padding: 20px;
        margin: 20px 0;
        border-radius: 0 4px 4px 0;
      }
      
      .admin-info-section {
        background-color: #d9edf7;
        border-left: 4px solid #5bc0de;
        padding: 20px;
        margin: 20px 0;
        border-radius: 0 4px 4px 0;
      }
      
      /* Product row */
      .product-row {
        display: flex;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e6e6e6;
      }
      
      .product-image-container {
        margin-right: 15px;
        flex-shrink: 0;
      }
      
      .product-details {
        flex: 1;
      }
      
      .product-name {
        font-weight: bold;
        color: #2c3e50;
        margin-bottom: 5px;
        font-size: 15px;
      }
      
      .product-attribute {
        color: #666;
        font-size: 13px;
        margin-bottom: 2px;
      }
      
      .product-price {
        color: #2c3e50;
        font-weight: bold;
        margin-top: 5px;
        font-size: 14px;
      }
      
      .admin-action-button {
        display: inline-block;
        background-color: #F69E87;
        color: #ffffff;
        text-decoration: none;
        padding: 12px 30px;
        border-radius: 4px;
        font-weight: bold;
        font-size: 14px;
        text-align: center;
        margin: 5px;
        border: none;
        cursor: pointer;
      }
      
      .admin-action-button:hover {
        background-color: #e5785f;
      }
      
      .admin-dashboard-button {
        background-color: #2c3e50;
      }
      
      .admin-dashboard-button:hover {
        background-color: #1a252f;
      }
      
      .action-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 20px;
      }
      
      /* Status badges */
      .status-badge {
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
        display: inline-block;
      }
      
      .status-pending {
        background-color: #f0ad4e;
        color: white;
      }
      
      .status-confirmed {
        background-color: #5bc0de;
        color: white;
      }
      
      .status-processing {
        background-color: #5cb85c;
        color: white;
      }
      
      .status-shipped {
        background-color: #5cb85c;
        color: white;
      }
      
      .status-delivered {
        background-color: #5cb85c;
        color: white;
      }
      
      .status-cancelled {
        background-color: #d9534f;
        color: white;
      }
      
      .payment-status {
        font-weight: bold;
      }
      
      .payment-success {
        color: #5cb85c;
      }
      
      .payment-pending {
        color: #f0ad4e;
      }
      
      .payment-failed {
        color: #d9534f;
      }
    </style>
  </head>

  <body
    class="body"
    style="
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    "
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="nl-container"
      role="presentation"
      style="
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        background-color: #f5f5f5;
      "
      width="100%"
    >
      <tbody>
        <tr>
          <td>
            <!-- New Order Alert Header -->
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-1"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #ffffff;
                        color: #000000;
                        padding: 30px 40px;
                        width: 680px;
                        margin: 0 auto;
                      "
                      width="680"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: center;
                              vertical-align: top;
                            "
                            width="100%"
                          >
                            <div class="new-order-badge">
                              🚨 NEW ORDER RECEIVED
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 20px; align-items: center;">
                              <div style="max-width: 200px">
                                <img
                                  alt="Logo"
                                  height="auto"
                                  src="https://res.cloudinary.com/dc0wr8hev/image/upload/v1766166906/lcsvrxwp43tsqaep2feu.png"
                                  style="
                                    display: block;
                                    height: auto;
                                    border: 0;
                                    width: 100%;
                                  "
                                  title="Logo"
                                  width="200"
                                />
                              </div>
                              <div style="text-align: right;">
                                <div style="color: #2c3e50; font-size: 24px; font-weight: bold; margin-bottom: 5px;">
                                  Mumworld.in Admin
                                </div>
                                <div style="color: #666; font-size: 14px;">
                                  Order Notification System
                                </div>
                              </div>
                            </div>
                            <div style="color: #2c3e50; font-size: 20px; font-weight: bold; margin-bottom: 15px; text-align: left;">
                              Admin Alert: New Order Placed
                            </div>
                            <div style="color: #666; font-size: 14px; line-height: 1.6; text-align: left;">
                              A new order has been placed on your store. Please review the order details and process it accordingly.
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Urgent Action Required -->
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-2"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #ffffff;
                        color: #000000;
                        padding: 20px 40px;
                        width: 680px;
                        margin: 0 auto;
                      "
                      width="680"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                            "
                            width="100%"
                          >
                            <div class="admin-alert-section">
                              <div style="font-weight: bold; color: #d9534f; margin-bottom: 10px; font-size: 16px;">
                                ⚡ ACTION REQUIRED
                              </div>
                              <div style="color: #2c3e50; font-size: 14px; line-height: 1.6;">
                                Please review and process this order within 24 hours. The customer has been notified of their order confirmation.
                              </div>
                              <div class="action-buttons">
                                <a
                                  href="${data?.adminDashboardUrl || "#"}"
                                  class="admin-action-button admin-dashboard-button"
                                  target="_blank"
                                >
                                  GO TO ADMIN DASHBOARD
                                </a>
                                <a
                                  href="${data?.orderDetailsUrl || "#"}"
                                  class="admin-action-button"
                                  target="_blank"
                                >
                                  VIEW ORDER DETAILS
                                </a>
                                <a
                                  href="${data?.manageOrdersUrl || "#"}"
                                  class="admin-action-button"
                                  style="background-color: #5bc0de;"
                                  target="_blank"
                                >
                                  MANAGE ORDERS
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Order Summary -->
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-3"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #ffffff;
                        color: #000000;
                        padding: 20px 40px;
                        width: 680px;
                        margin: 0 auto;
                      "
                      width="680"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                            "
                            width="100%"
                          >
                            <div class="section-title">📊 Order Summary</div>
                            
                            <!-- Order Details Table -->
                            <table class="order-details-table">
                              <tr>
                                <td class="label">Order ID:</td>
                                <td class="value">
                                  <strong style="color: #F69E87;">${data?.order_id || "N/A"}</strong>
                                </td>
                              </tr>
                              <tr>
                                <td class="label">Order Date & Time:</td>
                                <td class="value">${data?.order_date || "N/A"} ${data?.order_time ? `at ${data.order_time}` : ""}</td>
                              </tr>
                              <tr>
                                <td class="label">Customer Name:</td>
                                <td class="value">
                                  <strong>${data?.name || "Guest Customer"}</strong>
                                </td>
                              </tr>
                              <tr>
                                <td class="label">Customer Email:</td>
                                <td class="value">
                                  <a href="mailto:${data?.email || ""}" style="color: #F69E87; text-decoration: none;">
                                    ${data?.email || "N/A"}
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td class="label">Customer Phone:</td>
                                <td class="value">
                                  <a href="tel:${data?.phone || ""}" style="color: #2c3e50; text-decoration: none;">
                                    ${data?.phone || "N/A"}
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td class="label">Payment Method:</td>
                                <td class="value">
                                  <strong>${data?.payment_method || "N/A"}</strong>
                                </td>
                              </tr>
                              <tr>
                                <td class="label">Payment Status:</td>
                                <td class="value">
                                  <span class="payment-status ${data?.payment_status === 'success' ? 'payment-success' : data?.payment_status === 'pending' ? 'payment-pending' : 'payment-failed'}">
                                    ${data?.payment_status?.toUpperCase() || "PENDING"}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td class="label">Transaction ID:</td>
                                <td class="value" style="font-family: monospace; font-size: 12px;">
                                  ${data?.payment_id || "N/A"}
                                </td>
                              </tr>
                              <tr>
                                <td class="label">Order Status:</td>
                                <td class="value">
                                  <span class="status-badge status-${data?.status?.toLowerCase() || 'pending'}">
                                    ${data?.status || "PENDING"}
                                  </span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Financial Summary -->
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-4"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #ffffff;
                        color: #000000;
                        padding: 20px 40px;
                        width: 680px;
                        margin: 0 auto;
                      "
                      width="680"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                            "
                            width="100%"
                          >
                            <div class="section-title">💰 Financial Summary</div>
                            
                            <!-- Pricing Summary -->
                            <table class="order-details-table">
                              <tr>
                                <td class="label">Subtotal:</td>
                                <td class="value">₹${parseFloat(
                                  data?.subtotal || 0
                                ).toLocaleString("en-IN", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}</td>
                              </tr>
                              ${data?.tax ? `
                              <tr>
                                <td class="label">Tax (${data.tax_rate || "0"}%):</td>
                                <td class="value">₹${parseFloat(
                                  data.tax || 0
                                ).toLocaleString("en-IN", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}</td>
                              </tr>
                              ` : ""}
                              <tr>
                                <td class="label">Discount:</td>
                                <td class="value">-₹${parseFloat(
                                  data?.discount || 0
                                ).toLocaleString("en-IN", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}</td>
                              </tr>
                              ${data?.couponDiscountAmount ? `
                              <tr>
                                <td class="label">Coupon Discount:</td>
                                <td class="value" style="color: #5cb85c;">-₹${parseFloat(
                                  data.couponDiscountAmount || 0
                                ).toLocaleString("en-IN", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}</td>
                              </tr>
                              ` : ""}
                              ${data?.shipping_charge && parseFloat(data.shipping_charge) > 0 ? `
                              <tr>
                                <td class="label">Shipping Charge:</td>
                                <td class="value">₹${parseFloat(
                                  data.shipping_charge || 0
                                ).toLocaleString("en-IN", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}</td>
                              </tr>
                              ` : `
                              <tr>
                                <td class="label">Shipping:</td>
                                <td class="value" style="color: #5cb85c;">FREE</td>
                              </tr>
                              `}
                              <tr class="total-row">
                                <td class="label">Order Total:</td>
                                <td class="value">
                                  <strong style="color: #F69E87; font-size: 20px;">
                                    ₹${parseFloat(
                                      data?.totalAmount || 0
                                    ).toLocaleString("en-IN", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                  </strong>
                                </td>
                              </tr>
                              ${data?.profit_margin ? `
                              <tr>
                                <td class="label">Estimated Profit Margin:</td>
                                <td class="value" style="color: #5cb85c;">
                                  ₹${parseFloat(
                                    data.profit_margin || 0
                                  ).toLocaleString("en-IN", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })} (${data.profit_percentage || "0"}%)
                                </td>
                              </tr>
                              ` : ""}
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Customer & Shipping Details -->
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-5"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #ffffff;
                        color: #000000;
                        padding: 20px 40px 40px;
                        width: 680px;
                        margin: 0 auto;
                      "
                      width="680"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                            "
                            width="100%"
                          >
                            <!-- Customer Details -->
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
                              <div>
                                <div class="section-title">👤 Customer Details</div>
                                <div style="color: #2c3e50; line-height: 1.6; padding: 15px; background-color: #f9f9f9; border-radius: 4px;">
                                  <strong style="color: #F69E87;">${data?.name || ""}</strong><br>
                                  ${data?.email ? `<a href="mailto:${data.email}" style="color: #F69E87; text-decoration: none;">${data.email}</a><br>` : ""}
                                  ${data?.phone ? `<a href="tel:${data.phone}" style="color: #2c3e50; text-decoration: none;">${data.phone}</a><br>` : ""}
                                  ${data?.customer_id ? `Customer ID: ${data.customer_id}<br>` : ""}
                                  ${data?.total_orders ? `Total Orders: ${data.total_orders}<br>` : ""}
                                  ${data?.last_order_date ? `Last Order: ${data.last_order_date}<br>` : ""}
                                </div>
                              </div>
                              
                              <div>
                                <div class="section-title">📍 Shipping Address</div>
                                <div style="color: #2c3e50; line-height: 1.6; padding: 15px; background-color: #f9f9f9; border-radius: 4px;">
                                  <strong>${data?.name || ""}</strong><br>
                                  ${data?.address || ""}<br>
                                  ${data?.street ? data.street + "<br>" : ""}
                                  ${data?.city || ""}, ${data?.state || ""} - ${
    data?.pincode || ""
  }<br>
                                  ${data?.country || "India"}<br>
                                  ${data?.phone || ""}
                                  ${data?.ordernote
                                    ? `<br><br><strong>Order Note:</strong><br>${data.ordernote}`
                                    : ""}
                                </div>
                              </div>
                            </div>

                            <!-- Products Ordered -->
                            <div class="section-title">🛍️ Products Ordered</div>
                            ${
                              data?.products && data.products.length > 0
                                ? data.products
                                    .map(
                                      (product) => `
                                    <div class="product-row">
                                      <div class="product-image-container">
                                        <img
                                          src="${product.image || "https://via.placeholder.com/80x80?text=Product"}"
                                          alt="${product.name}"
                                          class="product-image"
                                          width="80"
                                        />
                                      </div>
                                      <div class="product-details">
                                        <div class="product-name">${product.name}</div>
                                        ${product.sku ? `<div class="product-attribute">SKU: ${product.sku}</div>` : ""}
                                        ${product.category ? `<div class="product-attribute">Category: ${product.category}</div>` : ""}
                                        ${product.quantity ? `<div class="product-attribute">Quantity: ${product.quantity}</div>` : ""}
                                        ${product.price ? `<div class="product-price">Price: ₹${parseFloat(product.price).toLocaleString("en-IN", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>` : ""}
                                        ${product.total ? `<div class="product-price" style="color: #F69E87;">Total: ₹${parseFloat(product.total).toLocaleString("en-IN", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>` : ""}
                                      </div>
                                    </div>
                                  `
                                    )
                                    .join("")
                                : `<div style="color: #666; padding: 20px; text-align: center; background-color: #f9f9f9; border-radius: 4px;">
                                    No products details available
                                   </div>`
                            }

                            <!-- Admin Notes -->
                            ${
                              data?.admin_notes
                                ? `
                              <div style="margin-top: 30px;">
                                <div class="section-title">📝 Admin Notes</div>
                                <div style="color: #2c3e50; line-height: 1.6; padding: 15px; background-color: #e8f4fd; border-left: 4px solid #5bc0de; border-radius: 4px;">
                                  ${data.admin_notes}
                                </div>
                              </div>
                            `
                                : ""
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Footer -->
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-6"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #2c3e50;
                        color: #ffffff;
                        padding: 30px 40px;
                        width: 680px;
                        margin: 0 auto;
                      "
                      width="680"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: center;
                              vertical-align: top;
                            "
                            width="100%"
                          >
                            <div style="color: #ffffff; font-size: 14px; line-height: 1.6; text-align: center;">
                              <p style="margin-bottom: 10px;">
                                <a href="${data?.admin_base_url || "#"}" style="color: #F69E87; text-decoration: none; font-weight: bold; font-size: 18px;">
                                  Mumworld.in Admin Portal
                                </a>
                              </p>
                              <p style="color: #cccccc; font-size: 12px; margin-bottom: 10px; line-height: 1.5;">
                                This is an automated notification for order #${data?.order_id || ""}. Please do not reply to this email.
                              </p>
                              <p style="color: #cccccc; font-size: 12px; margin-bottom: 20px; line-height: 1.5;">
                                For support, contact: mumworld.in@gmail.com | 
                                <a href="${data?.admin_support_url || "#"}" style="color: #F69E87; text-decoration: none;">Admin Support</a>
                              </p>
                              <p style="color: #999999; font-size: 11px; border-top: 1px solid #3a506b; padding-top: 15px; line-height: 1.5;">
                                Copyright © 2026 Mumworld.in - All Rights Reserved.<br>
                                This email was sent to admin@mumworld.in
                              </p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;

  return html;
};