export const orderNotification = (data) => {
  const html = `

<!DOCTYPE html>
<html
  lang="en-US"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:v="urn:schemas-microsoft-com:vml"
>
  <head>
    <title>Order Confirmation</title>
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

      /* Amazon Colors */
      .amazon-orange {
        color: #ff9900 !important;
      }
      
      .amazon-blue {
        color: #146eb4 !important;
      }
      
      .amazon-dark-blue {
        color: #232f3e !important;
      }
      
      .amazon-bg-dark-blue {
        background-color: #232f3e !important;
      }
      
      .amazon-bg-light {
        background-color: #f0f2f3 !important;
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

      /* Amazon Specific Styles */
      .prime-badge {
        background-color: #146eb4;
        color: white;
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 11px;
        font-weight: bold;
        display: inline-block;
      }
      
      .delivery-date {
        color: #F69E87;
        font-weight: bold;
        font-size: 18px;
      }
      
      .section-title {
        color: #232f3e;
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
      }
      
      .order-details-table .value {
        color: #232f3e;
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
      
      .shipping-section {
        background-color: #f6f6f6;
        border-left: 4px solid #F69E87;
        padding: 15px;
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
        color: #232f3e;
        margin-bottom: 5px;
        font-size: 15px;
      }
      
      .product-attribute {
        color: #666;
        font-size: 13px;
        margin-bottom: 2px;
      }
      
      .product-price {
        color: #232f3e;
        font-weight: bold;
        margin-top: 5px;
        font-size: 14px;
      }
      
      /* Currency formatting helper */
      .currency {
        font-family: Arial, sans-serif;
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
            

            <!-- Greeting Section -->
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
                              text-align: left;
                              vertical-align: top;
                            "
                            width="100%"
                          >
                          <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                            <div style="max-width: 260px">
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
                            
                          </div>
                            <div style="color: #232f3e; font-size: 20px; font-weight: bold; margin-bottom: 15px;">
                              Hello ${data?.name || "Valued Customer"},
                            </div>
                            <div style="color: #666; font-size: 14px; line-height: 1.6;">
                              Thank you for your order. We'll send a confirmation when your order ships. 
                              Your estimated delivery date is indicated below. If you would like to view the 
                              status of your order or make any changes to it, please visit Your Orders.
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Delivery Information -->
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
                            <div class="shipping-section">
                              <div style="font-weight: bold; color: #232f3e; margin-bottom: 10px;">
                                Arriving:
                              </div>
                              <div class="delivery-date">
                                ${
                                  data?.delivery_date ||
                                  "Within 5-7 business days"
                                }
                              </div>
                              <div style="color: #F69E87; font-size: 14px; margin-top: 10px;">
                                Standard Delivery • Free Shipping
                              </div>
                              <div style="margin-top: 12px;">
                              <a
                                href="${data?.orderDetailsUrl || "#"}"
                                style="
                                  display: inline-block;
                                  background-color: #F69E87;
                                  color: #ffffff;
                                  text-decoration: none;
                                  padding: 12px 30px;
                                  border-radius: 4px;
                                  font-weight: bold;
                                  font-size: 14px;
                                "
                                target="_blank"
                              >
                                VIEW OR MANAGE ORDER
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
                            <div class="section-title">Order Summary</div>
                            
                            <!-- Order Details Table -->
                            <table class="order-details-table">
                              <tr>
                                <td class="label">Order ID:</td>
                                <td class="value">${
                                  data?.order_id || "Not available"
                                }</td>
                              </tr>
                              <tr>
                                <td class="label">Order Placed:</td>
                                <td class="value">${
                                  data?.order_date || "Not available"
                                }</td>
                              </tr>
                              <tr>
                                <td class="label">Transaction ID:</td>
                                <td class="value">${
                                  data?.payment_id || "N/A"
                                }</td>
                              </tr>
                              <tr>
                                <td class="label">Status:</td>
                                <td class="value" style="color: #008a00;">${
                                  data?.status || "Confirmed"
                                }</td>
                              </tr>
                            </table>

                           

                            <!-- Pricing Summary -->
                            <table class="order-details-table">
                              <tr>
                                <td class="label">Subtotal:</td>
                                <td class="value">₹${parseFloat(
                                  data?.subtotal || 0
                                ).toLocaleString("en-IN", {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 2,
                                })}</td>
                              </tr>
                              <tr>
                                <td class="label">Discount:</td>
                                <td class="value">-₹${parseFloat(
                                  data?.discount || 0
                                ).toLocaleString("en-IN", {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 2,
                                })}</td>
                              </tr>
                              <tr>
                                <td class="label">Coupon Discount:</td>
                                <td class="value">-₹${parseFloat(
                                  data?.couponDiscountAmount || 0
                                ).toLocaleString("en-IN", {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 2,
                                })}</td>
                              </tr>
                              <tr>
                                <td class="label">Shipping:</td>
                                <td class="value" style="color: #008a00;">FREE</td>
                              </tr>
                              <tr class="total-row">
                                <td class="label">Order Total:</td>
                                <td class="value">₹${parseFloat(
                                  data?.totalAmount || 0
                                ).toLocaleString("en-IN", {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 2,
                                })}</td>
                              </tr>
                            </table>

                            <!-- Shipping Address -->
                            <div style="margin-top: 40px;">
                              <div class="section-title">Shipping Address</div>
                              <div style="color: #232f3e; line-height: 1.6; padding: 15px; background-color: #f9f9f9; border-radius: 4px;">
                                <strong>${data?.name || ""}</strong><br>
                                ${data?.address || ""}<br>
                                ${data?.street ? data.street + "<br>" : ""}
                                ${data?.city || ""}, ${data?.state || ""} - ${
    data?.pincode || ""
  }<br>
                                ${data?.country || ""}<br>
                                ${data?.phone || ""}<br>
                                ${data?.email || ""}
                                ${
                                  data?.ordernote
                                    ? `<br><br><strong>Order Note:</strong> ${data.ordernote}`
                                    : ""
                                }
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

            

            <!-- Footer -->
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-7"
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
                        background-color: #232f3e;
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
                              <p style="margin-bottom: 6px;">
                                <a href="${
                                  data?.base_url || "#"
                                }" style="color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px;">
                                  Mumworld.in
                                </a>
                              </p>
                              <p style="color: #cccccc; font-size: 12px; margin-bottom: 6px; line-height: 1.5;">
                                mumworld.in@gmail.com
                              </p>
                              <p style="color: #cccccc; font-size: 12px; margin-bottom: 20px; line-height: 1.5;"> Copyright © 2026 mumworld.in - All Rights Reserved.
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
